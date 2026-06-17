const axios = require("axios");
const { appConfig } = require("../../../config/app.config");

const execute = async (req) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) throw new Error("API key is missing");

  const response = await axios.get(`${appConfig.AUTH_SERVICE_URL}/api/org/apikey/validate`, {
    headers: { "x-api-key": apiKey },
  });

  const isAuth = response.data?.data?.success;
  if (!isAuth) throw new Error("Invalid API key");

  const data = response.data.data;
  return {
    user: data.user,
    authType: data.type === "org" ? "org_api_key" : "user_api_key",
  };
};

module.exports = { execute, name: "api_key" };
