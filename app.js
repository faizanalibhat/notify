const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { errorHandler } = require("./middlewares/error");
const router = require("./routes/index");
const cors = require("cors");
const { authenticateService } = require("./middlewares/auth");


// workers
const emailWorker = require("./workers/email/email.worker");
const activityWorker = require("./workers/activity/worker");
const notificationWorker = require("./workers/notification.worker");


const app = express();

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use("/notify/api", authenticateService(), router);

// connect mongodb
mongoose.connect(process.env.NOTIFY_MONGODB_URL)
.then(() => {
    console.log("[+] MONGODB CONNECTED");
})
.catch((err) => {
    console.log("[-] FAILED TO CONNECT MONGODB ", err.message);
});


// run the email worker
emailWorker();
activityWorker();
notificationWorker();


app.use(errorHandler);

app.listen(process.env.NOTIFY_PORT || 80, () => {
    console.log("[+] SERVER IS RUNNING ON PORT ", process.env.NOTIFY_PORT || 80);
});
