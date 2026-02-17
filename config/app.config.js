const { Config } = require("./env");

const appConfig = {
    DB_NAME: Config.get("DB_NAME", "notify"),

    SMTP_HOST: Config.get("SMTP_HOST"),
    SMTP_PORT: Config.get("SMTP_PORT"),
    SMTP_SECURE: Config.get("SMTP_SECURE"),
    SMTP_USER: Config.get("SMTP_USER"),
    SMTP_PASS: Config.get("SMTP_PASS"),
    EMAIL_FROM: Config.get("EMAIL_FROM"),
}


module.exports = { appConfig };