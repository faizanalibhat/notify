const { mqbroker } = require("../../services/rabbitmq.service");
const { connectDb } = require("../../models/connectDb");
const activityService = require("../../services/activity.service");
const ActivityLog = require("../../models/activityLog.model");


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

  // const routingKey = msg.fields.routingKey;

  // // Prevent processing our own emitted events
  // if (routingKey === "activitylogs.siem.push") {
  //   return channel.ack(msg);
  // }

  try {
    // Store raw activity log regardless of type or validity
    await ActivityLog.create(payload).catch(err =>
      console.error("[!] Failed to store raw activity log:", err.message)
    );

    const {
      type = "access",
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


    let endpoint = originalUrl?.split("?")[0] || path;

    // FIX: Normalize endpoint for VM service
    if (origin === "vm") {
      endpoint = endpoint.replace(/\/\/+/g, "/");
      if (!endpoint.startsWith("/vm") && !endpoint.startsWith("/csm")) {
        endpoint = `/vm${endpoint}`;
      }
    }

    console.log("[+] GOT ACTIVITY ", origin, method, endpoint);

    const action = activityService.parseActivity(endpoint, method);

    // throw this log to be pushed to siem
    await mqbroker.publish("activitylogs", "activitylogs.siem.push", { action, type: payload.type || "access", ...payload });

    if (type != "access" || !action) {
      return channel.ack(msg);
    }

    if (!orgId) {
      console.warn("[!] Skipping activity log: missing orgId");
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