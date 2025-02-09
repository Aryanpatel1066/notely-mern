// const express = require("express");
// const router = express.Router();
// const userModel = require("../models/user.model");

// // Route to get user by ID
// router.get("/todoApp/api/v1/user/:userId", async (req, res) => {
//     try {
//         const user = await userModel.findById(req.params.userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }
//         res.status(200).json(user);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Server error" });
//     }
// });

// module.exports = router;
