const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');
module.exports=(app)=>{
app.post('/todoApp/api/v1/send-otp', emailController.sendOTP);
app.post('/todoApp/api/v1/verify-otp', emailController.verifyOTP);
app.post('/todoApp/api/v1/reset-password', emailController.resetPassword);
}
 