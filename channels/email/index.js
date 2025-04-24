const nodemailer = require('nodemailer');

function createTransport(customConfig) {
    const defaultConfig = {
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE == 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        },
        // default from
        from: process.env.EMAIL_FROM
    };

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