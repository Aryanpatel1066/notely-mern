const todo_controller = require("../controllers/todo.controller");
const auth_mw = require("../middleware/auth.mw")
const todo_mw = require("../middleware/todo.mw")
module.exports = (app)=>{
app.post("/todoApp/api/v1/todo/creation",[auth_mw.verifyToken,todo_mw.checkTodoBody],todo_controller.todoCreation)
}