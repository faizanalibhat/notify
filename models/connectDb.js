const mongoose = require("mongoose");


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.NOTIFY_MONGODB_URL)
        console.log("[+] MONGODB CONNECTED");
    }
    catch(err) {
        console.log("[-] FAILED TO CONNECT MONGODB ", err.message);
    }
}


module.exports = { connectDb };