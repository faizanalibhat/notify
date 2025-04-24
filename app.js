const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { errorHandler } = require("./middlewares/error");
const router = require("./routes/index");


// workers
const emailWorker = require("./workers/email/email.worker");
const activityWorker = require("./workers/activity/worker");
const notificationWorker = require("./workers/notification.worker");


const app = express();

app.use(bodyParser.json());

app.use("/api", router);


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

app.listen(process.env.PORT || 80, () => {
    console.log("[+] SERVER IS RUNNING ON PORT ", process.env.PORT || 80);
});
