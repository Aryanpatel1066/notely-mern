//add the middelewear logic for todo

const checkTodoBody = async(req,res,next)=>{
    try{
    if(!req.body.description){
        return res.status(500).send({
            message:"the todo description is required"
        })
    }
    next()
    }
    catch(err){
        return res.status(504).send({
            message:"error wile checking mw body"
        })
    }
}

module.exports = {
checkTodoBody:checkTodoBody
}