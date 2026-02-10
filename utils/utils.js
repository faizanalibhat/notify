const { appConfig } = require("../config/app.config");
const { Config } = require("../config/env");

const sleep = async (ms) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms);
    })
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function buildMongodbUrl() {
    const USER = Config.get("MONGODB_USER");
    const PASS = Config.get("MONGODB_PASS");
    const HOST = Config.get("MONGODB_HOST");
    const PORT = Config.get("MONGODB_PORT");
    const DB_NAME = appConfig.DB_NAME;

    return `mongodb://${USER}:${PASS}@${HOST}:${PORT}/${DB_NAME}?authSource=admin`;
}


function buildRabbitmqUrl() {
    const USER = Config.get("RABBITMQ_USER");
    const PASS = Config.get("RABBITMQ_PASS");
    const HOST = Config.get("RABBITMQ_HOST");
    const PORT = Config.get("RABBITMQ_PORT");
    const VHOST = Config.get("RABBITMQ_VHOST");

    return `amqp://${USER}:${PASS}@${HOST}:${PORT}`;
}


function buildRedisUrl() {
    const HOST = Config.get("REDIS_HOST");
    const PORT = Config.get("REDIS_PORT");

    return `redis://${HOST}:${PORT}`;
}


module.exports = { sleep, escapeRegex, buildMongodbUrl, buildRabbitmqUrl, buildRedisUrl }