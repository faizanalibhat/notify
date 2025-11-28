const { mqbroker } = require("../../services/rabbitmq.service");
const { connectDb } = require("../../models/connectDb");
const activityService = require("../../services/activity.service");


function getClientIp(req) {
  // Prefer X-Forwarded-For (can contain multiple IPs, take the first)
  let ip =
    req.headers["x-forwarded-for"]?.split(",")[0].trim() ||
    req.headers["x-real-ip"] ||
    req.ip ||
    null;

  // Normalize IPv6-mapped IPv4 (::ffff:1.2.3.4 → 1.2.3.4)
  if (ip && ip.startsWith("::ffff:")) {
    ip = ip.replace("::ffff:", "");
  }

  // Normalize localhost (::1 → 127.0.0.1)
  if (ip === "::1") {
    ip = "127.0.0.1";
  }

  return ip;
}


// helper to normalize IPs
function normalizeIp(ip) {
  if (!ip) return null;
  if (ip.startsWith("::ffff:")) return ip.replace("::ffff:", "");
  if (ip === "::1") return "127.0.0.1";
  return ip;
}

async function activityLogsHandler(payload, msg, channel) {

  console.log("[+] GOT ACTIVITY ", payload.origin, payload.method, payload.path);

  try {
    const {
      headers = {},
      query = {},
      body = {},
      params = {},
      authContext = {},
      origin,
      method,
      path,
      originalUrl,
      ip,
    } = payload;

    const { orgId, firstName = "", lastName = "", email = "" } = authContext;

    if (!orgId) {
      console.warn("[!] Skipping activity log: missing orgId");
      return channel.ack(msg);
    }

    const endpoint = originalUrl?.split("?")[0] || path;
    const action = activityService.parseActivity(endpoint, method);

    console.log("[+] ACTIVITY LOG RECEIVED ", origin, method, path);

    // throw this log to be pushed to siem
    await mqbroker.publish("activitylogs", "activitylogs.siem.push", { ...payload, action });

    if (!action) {
      return channel.ack(msg);
    }

    const saveHeaders = {
      "user-agent": headers["user-agent"] || null,
      host: headers["host"] || null,
    };

    const activity = {
      type: payload.type,
      user: {
        name: `${firstName} ${lastName}`.trim(),
        email,
      },
      orgId,
      action,
      raw: {
        query,
        body,
        params,
        ip: getClientIp({ headers, ip }),
        headers: saveHeaders,
        originalUrl: endpoint,
        method,
      },
      origin,
    };

    const created = await activityService.createActivity(orgId, activity);

    if (created?.status === "failed") {
      console.error("[+] FAILED TO CREATE ACTIVITY");
      return channel.ack(msg);
    }

    console.log("[+] ACTIVITY LOG CREATED ", created?._id);

    channel.ack(msg);
  } catch (err) {
    console.error("[!] Error in activityLogsHandler:", err);
    channel.ack(msg); // Consider channel.nack(msg) if you want retries
  }
}



async function main() {
    // use this when running in isolation from main app.
    // await connectDb();


    // consume events
    await mqbroker.consume("activitylogs", "activitylogs.all", activityLogsHandler, "activityLogsQueue");
}


module.exports = main;