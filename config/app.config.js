const { Config } = require("./env");

const appConfig = {
    DB_NAME: Config.get("DB_NAME", "notify"),

    PUBLIC_KEY_PATH: Config.get("PUBLIC_KEY_PATH", "/app/keys/public.pem"),
    SERVICE_KEY: Config.get("SERVICE_KEY"),

    SMTP_HOST: Config.get("SMTP_HOST"),
    SMTP_PORT: Config.get("SMTP_PORT"),
    SMTP_SECURE: Config.get("SMTP_SECURE"),
    SMTP_USER: Config.get("SMTP_USER"),
    SMTP_PASS: Config.get("SMTP_PASS"),
    EMAIL_FROM: Config.get("EMAIL_FROM"),

    // Standard Service URLs
    AUTH_SERVICE_URL: Config.get("AUTH_SERVICE_URL", "http://auth"),
    AIM_SERVICE_URL: Config.get("AIM_SERVICE_URL", "http://aim"),
    VM_SERVICE_URL: Config.get("VM_SERVICE_URL", "http://vm"),
    UTIL_SERVICE_URL: Config.get("UTIL_SERVICE_URL", "http://util"),
    OP_SERVICE_URL: Config.get("OP_SERVICE_URL", "http://op"),
    VS_SERVICE_URL: Config.get("VS_SERVICE_URL", "http://vs"),
    VSCANNER_SERVICE_URL: Config.get("VSCANNER_SERVICE_URL", "http://vscanner"),
    CMDEXEC_SERVICE_URL: Config.get("CMDEXEC_SERVICE_URL", "http://cmdexec"),
    TM_SERVICE_URL: Config.get("TM_SERVICE_URL", "http://tm"),
    ASSET_INVENTORY_SERVICE_URL: Config.get("ASSET_INVENTORY_SERVICE_URL", "http://asset-inventory"),
    NOTIFY_SERVICE_URL: Config.get("NOTIFY_SERVICE_URL", "http://notify"),
}


module.exports = { appConfig };