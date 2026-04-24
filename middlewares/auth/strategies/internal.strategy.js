const { appConfig } = require("../../../config/app.config");

const serviceKey = appConfig.SERVICE_KEY;
const specialToken = appConfig.SPECIAL_ACCESS_TOKEN || serviceKey;

const execute = async (req) => {
  const serviceKeyValue = req.headers["service-api-key"];
  if (serviceKeyValue) {
    if (serviceKeyValue !== serviceKey) throw new Error("Invalid service key");
    return {
      user: { role: "Super" },
      authType: "service_key",
      service_req: true,
    };
  }

  const specialAccessToken = req.headers["x-special-access-token"] || req.query.special_token;
  if (specialAccessToken) {
    if (specialAccessToken !== specialToken) throw new Error("Invalid special access token");
    return {
      user: { role: "Super" },
      authType: "special_token",
      service_req: true,
    };
  }

  throw new Error("Internal authentication credentials missing");
};

module.exports = { execute, name: "internal" };
