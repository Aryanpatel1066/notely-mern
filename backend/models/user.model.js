const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        minlength: 10,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    otp: { type: String },
    otpExpires: { type: Date }

},{timestamps:true,versionKey:false});
module.exports = mongoose.model("usar",userSchema);