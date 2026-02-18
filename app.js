const express = require("express");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/error");
const router = require("./routes/index");
const cors = require("cors");
const { authenticateService } = require("./middlewares/auth");
const initSwagger = require("./swagger");


// workers
const emailWorker = require("./workers/email/email.worker");
const activityWorker = require("./workers/activity/worker");
const notificationWorker = require("./workers/notification.worker");
const { startCleanupWorker: activityCleanupWorker } = require("./workers/activity/cleanup.worker");

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

initSwagger(app);


const activityController = require("./controllers/activity.controller");
app.get("/notify/internal/activity/:orgId", activityController.getOrgActivityWithStats);

app.use("/notify/test", require("./routes/test.routes"));

app.use("/notify/api", authenticateService(), router);

connect();

// run the email worker
emailWorker();
activityWorker();
notificationWorker();
activityCleanupWorker();

app.use(errorHandler);

const PORT = Config.get("NOTIFY_PORT", 80);

app.listen(PORT, () => {
  console.log("[NOTIFY] SERVER IS RUNNING ON PORT ", PORT);
});
