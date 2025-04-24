const { mqbroker } = require("./services/rabbitmq.service");


// throw event
mqbroker.publish("activitylogs", "activitylogs.all", { origin: "TEST" });