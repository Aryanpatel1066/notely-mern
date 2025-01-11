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
    userType: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
},{timestamps:true,versionKey:false});
module.exports = mongoose.model("user",userSchema);