const amqp = require('amqplib');
const { buildRabbitmqUrl } = require('../utils/utils');

class RabbitMQ {
    constructor() {
        this.connection = null;
        this.publishChannel = null; // Dedicated channel for publishing
        this.consumerChannels = new Map(); // Map of consumerTag to channel
        this.consumers = []; // Store consumer configurations for restarts
        this.exchangeTypes = {
            direct: 'direct',
            topic: 'topic',
            fanout: 'fanout'
        };
        this.url = buildRabbitmqUrl();
        this.reconnectAttempt = 0;
        this.reconnectPromise = null;
        this.connect().catch((err) => {
            console.error('Initial RabbitMQ connection failed:', err.message);
            this.reconnect();
        });
    }

    static getInstance() {
        if (!RabbitMQ.instance) {
            RabbitMQ.instance = new RabbitMQ();
        }
        return RabbitMQ.instance;
    }

    handleDisconnect() {
        if (this.connection) {
            try {
                this.connection.removeAllListeners();
                this.connection.close();
            } catch (err) {
                // Ignore close errors
            }
            this.connection = null;
        }
        this.publishChannel = null;
        this.consumerChannels.clear();
        this.reconnect();
    }

    reconnect() {
        if (this.reconnectPromise) {
            return this.reconnectPromise;
        }

        this.reconnectPromise = (async () => {
            const maxAttempts = 10;
            while (this.reconnectAttempt < maxAttempts) {
                this.reconnectAttempt++;
                const delay = Math.min(1000 * 2 ** this.reconnectAttempt, 30000); // Exponential backoff, max 30s
                console.log(`Reconnecting in ${delay}ms (attempt ${this.reconnectAttempt})...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                try {
                    await this.connect();
                    this.reconnectAttempt = 0;
                    this.reconnectPromise = null;
                    return;
                } catch (err) {
                    console.error(`Reconnection failed (attempt ${this.reconnectAttempt}):`, err.message);
                }
            }
            console.error('Max reconnection attempts reached. Shutting down.');
            process.exit(1);
        })();

        return this.reconnectPromise;
    }

    async createPublishChannel() {
        if (this.publishChannel) return;

        this.publishChannel = await this.connection.createConfirmChannel();

        this.publishChannel.on('error', (err) => {
            console.error('Publish channel error:', err.message);
            this.publishChannel = null;
            this.handleDisconnect();
        });

        this.publishChannel.on('close', () => {
            console.log('Publish channel closed');
            this.publishChannel = null;
            this.handleDisconnect();
        });
    }

    async createConsumerChannel(consumerTag) {
        const channel = await this.connection.createChannel();
        await channel.prefetch(10); // Limit to 10 unacknowledged messages per consumer

        channel.on('error', (err) => {
            console.error(`Consumer channel error (${consumerTag}):`, err.message);
            this.consumerChannels.delete(consumerTag);
            this.handleDisconnect();
        });

        channel.on('close', () => {
            console.log(`Consumer channel closed (${consumerTag})`);
            this.consumerChannels.delete(consumerTag);
            this.handleDisconnect();
        });

        this.consumerChannels.set(consumerTag, channel);
        return channel;
    }

    async connect() {
        if (this.connection && this.publishChannel) return;

        if (this.connection) {
            try {
                this.connection.removeAllListeners();
                await this.connection.close();
            } catch (err) {
                // Ignore close error
            }
            this.connection = null;
        }

        this.connection = await amqp.connect(this.url);
        console.log('[+] Connected to RabbitMQ...');

        this.connection.on('error', (err) => {
            console.error('RabbitMQ Connection Error:', err.message);
            this.handleDisconnect();
        });

        this.connection.on('close', () => {
            console.log('RabbitMQ connection closed');
            this.handleDisconnect();
        });

        await this.createPublishChannel();
        // Restart consumers
        await this.restartConsumers();
    }

    async restartConsumers() {
        const consumers = [...this.consumers]; // Copy to avoid mutation issues
        this.consumers = [];
        this.consumerChannels.clear();
        let i = 0;
        try {
            for (; i < consumers.length; i++) {
                const consumer = consumers[i];
                if (consumer.method === 'consume') {
                    await this.consume(consumer.exchange, consumer.bindingKey, consumer.callback, consumer.queueName);
                } else if (consumer.method === 'receive') {
                    await this.receive(consumer.queue, consumer.callback);
                } else if (consumer.method === 'intercept') {
                    await this.intercept(consumer.exchange, consumer.callback);
                }
            }
        } catch (error) {
            // Restore unprocessed consumers back to this.consumers
            for (let j = i; j < consumers.length; j++) {
                this.consumers.push(consumers[j]);
            }
            throw error;
        }
    }

    // Direct message publish
    async send(queue, message) {
        if (!this.publishChannel) {
            await this.reconnect();
        }
        await this._assertQueue(queue, this.exchangeTypes.direct, { durable: true, arguments: { 'x-queue-mode': 'lazy' } }, this.publishChannel);
        this.publishChannel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
    }

    // Topic exchange publish
    async publish(exchange, routingKey, message) {
        if (!this.publishChannel) {
            await this.reconnect();
        }
        await this._assertExchange(exchange, this.exchangeTypes.topic, { durable: true }, this.publishChannel);
        this.publishChannel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), { persistent: true });
    }

    // Consume messages for a topic exchange
    async consume(exchange, bindingKey, callback, queueName = '') {
        if (!this.connection) {
            await this.reconnect();
        }
        const channel = await this.createConsumerChannel(`consume-${exchange}-${queueName}`);
        await this._assertExchange(exchange, this.exchangeTypes.topic, { durable: true }, channel);
        const queue = await channel.assertQueue(queueName, { durable: true, arguments: { 'x-queue-mode': 'lazy' } });
        await channel.bindQueue(queue.queue, exchange, bindingKey);
        const { consumerTag } = await channel.consume(queue.queue, (msg) => {
            try {
                const content = msg.content.toString();
                const parsed = JSON.parse(content);
                callback(parsed, msg, channel);
            } catch (err) {
                console.error(`Consumer error (consume, ${queue.queue}):`, err.message);
                channel.nack(msg, false, false); // Discard bad message
            }
        }, { noAck: false });
        this.consumers.push({ method: 'consume', exchange, bindingKey, callback, queueName, consumerTag });
    }

    // Direct message consume
    async receive(queue, callback) {
        if (!this.connection) {
            await this.reconnect();
        }
        const channel = await this.createConsumerChannel(`receive-${queue}`);
        await this._assertQueue(queue, this.exchangeTypes.direct, { durable: true, arguments: { 'x-queue-mode': 'lazy' } }, channel);
        const { consumerTag } = await channel.consume(queue, (msg) => {
            try {
                const content = msg.content.toString();
                const parsed = JSON.parse(content);
                callback(parsed, msg, channel);
            } catch (err) {
                console.error(`Consumer error (receive, ${queue}):`, err.message);
                channel.nack(msg, false, false); // Discard bad message
            }
        }, { noAck: false });
        this.consumers.push({ method: 'receive', queue, callback, consumerTag });
    }

    // Fanout broadcast
    async broadcast(exchange, message) {
        if (!this.publishChannel) {
            await this.reconnect();
        }
        await this._assertExchange(exchange, this.exchangeTypes.fanout, { durable: true }, this.publishChannel);
        this.publishChannel.publish(exchange, '', Buffer.from(JSON.stringify(message)), { persistent: true });
    }

    // Fanout intercept
    async intercept(exchange, callback) {
        if (!this.connection) {
            await this.reconnect();
        }
        const channel = await this.createConsumerChannel(`intercept-${exchange}`);
        await this._assertExchange(exchange, this.exchangeTypes.fanout, { durable: true }, channel);
        const queue = await channel.assertQueue('', { durable: true, arguments: { 'x-queue-mode': 'lazy' } });
        await channel.bindQueue(queue.queue, exchange, '');
        const { consumerTag } = await channel.consume(queue.queue, (msg) => {
            try {
                const content = msg.content.toString();
                const parsed = JSON.parse(content);
                callback(parsed, msg, channel);
            } catch (err) {
                console.error(`Consumer error (intercept, ${exchange}):`, err.message);
                channel.nack(msg, false, false); // Discard bad message
            }
        }, { noAck: false });
        this.consumers.push({ method: 'intercept', exchange, callback, consumerTag });
    }

    // Internal helper for asserting queues
    async _assertQueue(queue, type, options, channel) {
        if (!channel) {
            throw new Error('Channel is not initialized.');
        }
        await channel.assertQueue(queue, options);
    }

    // Internal helper for asserting exchanges
    async _assertExchange(exchange, type, options, channel) {
        if (!channel) {
            throw new Error('Channel is not initialized.');
        }
        await channel.assertExchange(exchange, type, options);
    }
}

module.exports = { mqbroker: RabbitMQ.getInstance() };