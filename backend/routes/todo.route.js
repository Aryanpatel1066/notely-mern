const todo_controller = require("../controllers/todo.controller")
module.exports = (app)=>{
app.post("/todoApp/api/v1/todo/creation",todo_controller.todoCreation)
}