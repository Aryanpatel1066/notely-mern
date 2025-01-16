const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken");
const auth_config= require("../configs/auth.config")
const verifySignupBody = async (req,res,next)=>{
    try{
    if(!req.body.name){
        return res.status(500).send({
            message:"provide the user name"
        })
    }
    if(!req.body.userId){
        return res.status(500).send({
            message:"userId is required"
        })
    }
    if(!req.body.email){
        return res.status(500).send({
            message:"provide the user email" 
        })
    }
    if(!req.body.password){
        return res.status(500).send({
            message:"provide the user password"
        })
    }
    //check if same email id 
    const userEmail = await user_model.findOne({email:req.body.email});
    if(userEmail){
       return res.status(500).send({
            message:"failde email id allredy exist"
        })
    }
    const userId = await user_model.findOne({userId:req.body.userId});
    if(userId){
        return res.status(500).send({
            message:"failed! userId allredy exist"
        })
    }
    next()
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message:"error while verifying signup body"
        })
    }
}
const verifySignInBody = async(req,res,next)=>{
    try{
     if(!req.body.userId){
      return res.status(400).send({
        message:"userId does not provided"
      })
     }
     else if(!req.body.password){
      return res.status(400).send({
        message:"password is not provided"
      })
     }
     next()
    }
    catch(err){
      console.log(err)
    }
  }
  const verifyToken = async (req, res, next) => {
    try {
      // Step 1: Check if the token is present in the header
      const token = req.header("access-token-key");
      if (!token) {
        return res.status(401).send({
          message: "Unauthorized: No token found",
        });
      }
  
      // Step 2: Verify the token
      jwt.verify(token, auth_config.secrate, async (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized: Invalid token",
          });
        }
  
        // Step 3: Fetch the user from the database using the decoded token's ID
        const user = await user_model.findOne({ userId: decoded.id });
        if (!user) {
          return res.status(401).send({
            message: "Unauthorized: No user found for this token",
          });
        }
  
        // Step 4: Attach user information to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler
      });
    } catch (error) {
      console.error("Error in verifyToken middleware:", error);
      res.status(500).send({
        message: "Internal server error in token verification",
      });
    }
  };
  
module.exports ={
    verifySignupBody:verifySignupBody,
    verifySignInBody:verifySignInBody,
    verifyToken:verifyToken
}