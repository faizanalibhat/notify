const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: String,
    email: String
}, { _id: false });



const notificationSchema = new mongoose.Schema({
    orgId: { type: String, },
    type: { type: String },
    title: { type: String, required: true },
    description: { type: String, required: true },
    origin: { type: String, required: true },
    user: { type: userSchema },
});


module.exports = mongoose.model("notifications", notificationSchema);