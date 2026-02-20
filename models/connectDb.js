const mongoose = require("mongoose");
const { appConfig } = require("../config/app.config");


const connectDb = async () => {
    try {
        await mongoose.connect(appConfig.DB_NAME)
        console.log("[+] MONGODB CONNECTED");
    }
    catch(err) {
        console.log("[-] FAILED TO CONNECT MONGODB ", err.message);
    }
}


module.exports = { connectDb };