const jwt = require("jsonwebtoken");
const fs = require("fs");
const { appConfig } = require("../../../config/app.config");

const publicKey = fs.readFileSync(appConfig.PUBLIC_KEY_PATH, "utf8");

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) return authHeader.split(" ")[1];
  return null;
};

const execute = async (req) => {
  const token = getTokenFromRequest(req);
  if (!token) throw new Error("Authentication token is missing");

  const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
  if (decoded.type !== "intermediary" || decoded.scope !== "org_selection") {
    throw new Error("Invalid token type for this endpoint");
  }

  return { user: decoded, authType: "intermediary" };
};

module.exports = { execute, name: "intermediary" };
