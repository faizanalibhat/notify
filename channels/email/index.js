const nodemailer = require('nodemailer');
const { appConfig } = require('../../config/app.config');

function createTransport(customConfig) {
    const fromStr = appConfig.EMAIL_FROM || "";
    const emailMatch = fromStr.match(/<([^>]+)>/);
    const address = emailMatch ? emailMatch[1] : fromStr.trim();
    const nameMatch = fromStr.match(/^"([^"]+)"/) || fromStr.match(/^([^<]+)/);
    const name = nameMatch ? nameMatch[1].trim() : "Snapsec Suite";

    const defaultConfig = {
        host: appConfig.SMTP_HOST,
        port: parseInt(appConfig.SMTP_PORT),
        secure: parseInt(appConfig.SMTP_PORT) === 465,
        auth: {
            user: appConfig.SMTP_USER,
            pass: appConfig.SMTP_PASS
        },
        tls: {
            rejectUnauthorized: false
        },
        from: { name, address }
    };

    console.log(JSON.stringify(defaultConfig));

    const transporter = nodemailer.createTransport(customConfig || defaultConfig);

    // Optional: verify connection
    transporter.verify((err, success) => {
        if (err) {
            console.log(defaultConfig);
            console.error('[+] SMTP CONNECTION FAILED ', err);
        } else {
            console.log('[+] SMTP SUCCESSFULLY CONNECTED');
        }
    });

    return transporter;
}

module.exports = createTransport;