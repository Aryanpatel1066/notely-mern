const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const authConfig = require("../configs/auth.config")
const jwt = require("jsonwebtoken")
exports.signup=async (req,res)=>{
    try{
     //step1: read the request body 
     const request_body = req.body;
     //step2:read the userdata present in body
     const userData = {
        name:request_body.name,
        userId:request_body.userId,
        email:request_body.email,
         password: bcrypt.hashSync(request_body.password,8),
         userType: "user", // Default userType

     }
     const user_created = await user_model.create(userData);
     //step3: response back to user
           const res_obj ={
            name:user_created.name,
            userId:user_created.password,
            email:user_created.email,
            password:bcrypt.hashSync(user_created.password,8),
            userType:user_created.userType,
            createdAt:user_created.createdAt,
            updetedAt:user_created.updatedAt
           }
           res.status(200).send({
            message:"successfully! user created",
            user:res_obj
           })
    }
    catch(err){
        res.status(502).send({
            message:"error while signup"
        })
    }
}

//controller for the signin
exports.signin = async (req,res)=>{
    try{
       const user = await user_model.findOne({userId:req.body.userId})
       if(user == null){
        return res.status(404).send({
            message:"userId is not vallid"
        })
       }
       const isPasswordValid =bcrypt.compareSync(req.body.password,user.password)
       if(!isPasswordValid){
        return res.status(500).send({
            message:"wrong password provided"
        })
       }
       //create the token
       const token =jwt.sign({userId:user.userId},authConfig.secrate,{expiresIn:1120})
       res.status(200).send({
        name:user.name,
         email:user.email,
        userType:user.userType,
        accessToken:token
    })
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message:"something wrong while signIn"
        })
    }
}