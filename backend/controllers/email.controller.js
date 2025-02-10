const nodemailer = require('nodemailer');
const User = require("../models/user.model");
const bcrypt = require('bcryptjs')
const authConfig = require("../configs/auth.config");

const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail service instead of defining host
    auth: {
      user: "aryan.dev1066@gmail.com",  
      pass: "mlbpobvavvrskhfa"  
    }
  });
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

exports.sendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        await transporter.sendMail({
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is: ${otp}`
        });

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to send OTP" });
    }
};

exports.verifyOTP = async (req, res) => {
    const {  otp } = req.body;
  if(!otp){
    return res.status(400).json({ message: "OTP is required" });

  }
    try {
        const user = await User.findOne({  otp });
        if (!user || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        res.status(200).json({ message: "OTP Verified" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "OTP verification failed" });
    }
};

exports.resetPassword = async (req, res) => {
    const {    otp, newPassword } = req.body;

    try {
        const user = await User.findOne({  otp });
        if (!user || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        user.password = bcrypt.hashSync(newPassword, 8);
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Password reset failed" });
    }
};
