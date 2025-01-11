const user_model = require("../models/user.model")
const verifySignupBody = async (req,res,next)=>{
    try{
    if(!req.body.name){
        return res.status(500).send({
            message:"provide the user name"
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
    next()
    }
    catch(err){
        console.log(err);
        res.status(500).send({
            message:"error while verifying signup body"
        })
    }
}
module.exports ={
    verifySignupBody:verifySignupBody
}