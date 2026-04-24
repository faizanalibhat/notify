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
  if (data.type === "user") {
    return {
      user: {
        userId: data.user._id,
        email: data.user.email,
        role: data.user.role,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        orgId: data.org._id,
      },
      authType: "user_api_key",
    };
  }

  return {
    user: {
      orgId: data.org._id,
      email: `support+${data.org.name}@snapsec.co`,
      role: "Admin",
    },
    authType: "org_api_key",
  };
};

module.exports = { execute, name: "api_key" };
