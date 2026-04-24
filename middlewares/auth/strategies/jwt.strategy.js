const jwt = require("jsonwebtoken");
const fs = require("fs");
const { appConfig } = require("../../../config/app.config");
const { mqbroker } = require("../../../services/rabbitmq.service");

const publicKey = fs.readFileSync(appConfig.PUBLIC_KEY_PATH, "utf8");

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) return authHeader.split(" ")[1];
  if (req.cookies && req.cookies.token) return req.cookies.token;
  return null;
};

const execute = async (req, options = {}) => {
  const token = getTokenFromRequest(req);
  if (!token) throw new Error("Authentication token is missing");

  const decodedToken = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
  if (decodedToken.type === "intermediary") throw new Error("Intermediary token cannot be used to access protected APIs");

  if (decodedToken.licenceExpiry && new Date(decodedToken.licenceExpiry) < new Date()) {
    if (!["Admin", "Super"].includes(decodedToken.role)) {
      const error = new Error("License has expired");
      error.code = "LICENSE_EXPIRED";
      error.licenseExpiry = decodedToken.licenceExpiry;
      throw error;
    }
  }

  if (options.requiredOrgAccess && decodedToken.orgAccess && !decodedToken.orgAccess.includes(options.requiredOrgAccess)) {
    throw new Error(`You do not have access to SnapSec ${options.requiredOrgAccess}`);
  }

  if (!options.skipActivityLog) {
    const requestData = {
      method: req.method,
      path: req.path,
      headers: req.headers,
      query: req.query,
      params: req.params,
      body: req.body,
      ip: req.ip,
      originalUrl: req.originalUrl,
      authContext: decodedToken,
      origin: options.activityOrigin || "auth",
    };
    await mqbroker.publish("activitylogs", "activitylogs.all", requestData);
  }

  return { user: decodedToken, authType: "jwt" };
};

module.exports = { execute, name: "jwt" };
