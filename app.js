const express = require("express");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/error");
const router = require("./routes/index");
const cors = require("cors");
const { authenticateService } = require("./middlewares/auth");

// workers
const emailWorker = require("./workers/email/email.worker");
const activityWorker = require("./workers/activity/worker");
const notificationWorker = require("./workers/notification.worker");

const connect = require("./database/connect");
const { Config } = require("./config/env");

const app = express();

// app.use(cors());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(bodyParser.json());

app.use("/notify/api", authenticateService(), router);

connect();

// run the email worker
emailWorker();
activityWorker();
notificationWorker();

app.use(errorHandler);

const PORT = Config.get("NOTIFY_PORT", 80);

app.listen(PORT, () => {
  console.log("[NOTIFY] SERVER IS RUNNING ON PORT ", PORT);
});
