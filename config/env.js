


class Config {

    static check() {}

    static get(key, defaultValue) {
        return process.env[key] || defaultValue;
    }
}

module.exports = { Config };