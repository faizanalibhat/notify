const nodemailer = require('nodemailer');
const { appConfig } = require('../../config/app.config');

function createTransport(customConfig) {
    const defaultConfig = {
        host: appConfig.SMTP_HOST,
        port: appConfig.SMTP_PORT,
        secure: appConfig.SMTP_SECURE == 'true',
        auth: {
            user: appConfig.SMTP_USER,
            pass: appConfig.SMTP_PASS
        },
        // default from
        from: appConfig.EMAIL_FROM
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