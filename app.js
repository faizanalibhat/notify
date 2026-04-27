const express = require("express");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/error");
const router = require("./routes/index");
const cors = require("cors");
const { authenticateService } = require("./middlewares/auth/index");

const requireAuth = authenticateService();
const initSwagger = require("./swagger");
const { appConfig } = require("./config/app.config");


// workers
const emailWorker = require("./workers/email/email.worker");
const activityWorker = require("./workers/activity/worker");
const notificationWorker = require("./workers/notification.worker");
const { startCleanupWorker: activityCleanupWorker } = require("./workers/activity/cleanup.worker");
const orgDeleteWorker = require("./workers/org-delete-worker/main");

const connect = require("./database/connect");
const { Config } = require("./config/env");

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    appConfig.BASE_URL,
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ],
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization,X-Requested-With,Accept,Origin",
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(bodyParser.json());

initSwagger(app);


const activityController = require("./controllers/activity.controller");
app.get("/notify/internal/activity/:orgId", activityController.getOrgActivityWithStats);
app.get("/notify/internal/activity/user/logs", activityController.getUserActivity);

app.use("/notify/test", require("./routes/test.routes"));

app.use("/notify/api", requireAuth, router);

connect();

// run the email worker
emailWorker();
activityWorker();
notificationWorker();
orgDeleteWorker();
activityCleanupWorker();

app.use(errorHandler);

const PORT = Config.get("NOTIFY_PORT", 80);

app.listen(PORT, () => {
  console.log("[NOTIFY] SERVER IS RUNNING ON PORT ", PORT);
});
