const { Config } = require("./env");

const appConfig = {
    DB_NAME: Config.get("DB_NAME", "notify"),
}


module.exports = { appConfig };