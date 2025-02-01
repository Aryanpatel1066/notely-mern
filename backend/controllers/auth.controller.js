const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const authConfig = require("../configs/auth.config");
const jwt = require("jsonwebtoken");

// Signup Controller
exports.signup = async (req, res) => {
  try {
    // Step 1: Read the request body
    const request_body = req.body;
    
    // Step 2: Read the user data present in the body
    const userData = {
      name: request_body.name,
       email: request_body.email,
      password: bcrypt.hashSync(request_body.password, 8), // Password hashed using bcrypt
     };

    // Step 3: Create the user
    const user_created = await user_model.create(userData);

    // Step 4: Create response object, exclude password
    const res_obj = {
      name: user_created.name,
       email: user_created.email,
       createdAt: user_created.createdAt,
      updatedAt: user_created.updatedAt,
    };

    // Step 5: Send response back to the user
    res.status(200).send({
      message: "Successfully! User created.",
      user: res_obj,
    });
  } catch (err) {
    console.error(err);
    res.status(502).send({
      message: "Error while signing up.",
    });
  }
};

// Signin Controller
exports.signin = async (req, res) => {
  try {
    // Find user based on userId
    const user = await user_model.findOne({email: req.body.email });

    // If user is not found, return an error
    if (!user) {
      return res.status(404).send({
        message: "email is not valid",
      });
    }

    // Validate password using bcrypt
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(500).send({
        message: "Wrong password provided",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { email: user.email, name: user.name,   },
      authConfig.secrate,
      { expiresIn: 101120 } // Set your token expiration time
    );

    // Step 6: Send response with accessToken
    res.status(200).send({
      name: user.name,
      email: user.email,
       accessToken: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Something went wrong while signing in",
    });
  }
};
