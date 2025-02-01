const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth_config = require("../configs/auth.config");

// Middleware to verify the signup body (check if required fields are provided)
const verifySignupBody = async (req, res, next) => {
  try {
    // Validate required fields
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(400).send({
        message: "User name is required",
      });
    }

    

    if (!email) {
      return res.status(400).send({
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).send({
        message: "Password is required",
      });
    }

    // Check if email already exists in the database
    const userEmail = await user_model.findOne({ email: req.body.email });
    if (userEmail) {
      return res.status(400).send({
        message: "Email ID already exists",
      });
    }

   
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error while verifying signup body:", err);
    res.status(500).send({
      message: "Internal server error during signup validation",
    });
  }
};

// Middleware to verify the signin body (check if userId and password are provided)
const verifySignInBody = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).send({
        message: "email ID is required",
      });
    }

    if (!password) {
      return res.status(400).send({
        message: "Password is required",
      });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Error while verifying signin body:", err);
    res.status(500).send({
      message: "Internal server error during signin validation",
    });
  }
};

// Middleware to verify the token (authenticate the user)
const verifyToken = async (req, res, next) => {
  try {
    // Step 1: Get token from the header (custom header in this case)
    const token = req.header("access-token-key");

    // Step 2: If no token is provided
    if (!token) {
      return res.status(401).send({
        message: "Unauthorized: No token found",
      });
    }

    // Step 3: Verify the token using the secret
    jwt.verify(token, auth_config.secrate, async (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized: Invalid or expired token",
        });
      }

      // Step 4: Check if the user exists based on the decoded userId
      const user = await user_model.findOne({ userId: decoded.userId });
      if (!user) {
        return res.status(401).send({
          message: "Unauthorized: No user found for this token",
        });
      }

      // Step 5: Attach the user to the request object
      req.user = user;
      next(); // Proceed to the next middleware or route handler
    });
  } catch (err) {
    console.error("Error in verifyToken middleware:", err);
    res.status(500).send({
      message: "Internal server error in token verification",
    });
  }
};

// Export the middleware functions
module.exports = {
  verifySignupBody,
  verifySignInBody,
  verifyToken,
};
