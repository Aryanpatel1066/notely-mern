const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

router.post('/send-otp', emailController.sendOTP);
router.post('/verify-otp', emailController.verifyOTP);
router.post('/reset-password', emailController.resetPassword);

module.exports = router;
