const mongoose = require('mongoose');
const { buildMongodbUrl } = require('../utils/utils');

const MONGODB_URL = buildMongodbUrl();

const MONGO_OPTIONS = {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4
};

const MAX_RETRIES = 8;
const INITIAL_BACKOFF_MS = 1000;

function setupConnectionListeners() {
  const connection = mongoose.connection;
  connection.removeAllListeners("connected");
  connection.removeAllListeners("error");
  connection.removeAllListeners("disconnected");
  connection.removeAllListeners("reconnected");

  connection.on("connected", () => console.log("[MongoDB] Connection established successfully."));
  connection.on("error", (err) => console.error("[MongoDB] Connection error:", err.message));
  connection.on("disconnected", () => console.warn("[MongoDB] Connection lost. Driver will attempt automatic reconnection..."));
  connection.on("reconnected", () => console.log("[MongoDB] Reconnected successfully."));
}

async function connect(retries = MAX_RETRIES, delay = INITIAL_BACKOFF_MS) {
  setupConnectionListeners();

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[MongoDB] Connecting to database (Attempt ${attempt}/${retries})...`);
      await mongoose.connect(MONGODB_URL, MONGO_OPTIONS);
      return;
    } catch (error) {
      console.error(`[MongoDB] Connection attempt ${attempt} failed: ${error.message}`);
      if (attempt === retries) {
        console.error(`[MongoDB] Could not establish connection after ${retries} attempts.`);
        process.exit(1);
      }
      const jitter = Math.random() * 200;
      const nextDelay = delay * 2 + jitter;
      console.log(`[MongoDB] Retrying in ${Math.round(nextDelay / 1000)}s...`);
      await new Promise(res => setTimeout(res, nextDelay));
      delay = nextDelay;
    }
  }
}


module.exports = connect;