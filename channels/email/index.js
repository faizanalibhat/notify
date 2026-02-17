const nodemailer = require('nodemailer');
const { appConfig } = require('../../config/app.config');

function createTransport(customConfig) {
    const defaultConfig = {
        host: appConfig.SMTP_HOST,
        port: parseInt(appConfig.SMTP_PORT),
        secure: parseInt(appConfig.SMTP_PORT) === 465, // Use SSL/TLS for port 465, otherwise use STARTTLS
        auth: {
            user: appConfig.SMTP_USER,
            pass: appConfig.SMTP_PASS
        },
        tls: {
            // Do not fail on invalid certs (common for internal SMTP servers)
            rejectUnauthorized: false
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