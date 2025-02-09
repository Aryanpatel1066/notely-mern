const todo_controller = require("../controllers/todo.controller");
const auth_mw = require("../middleware/auth.mw")
const todo_mw = require("../middleware/todo.mw")
module.exports = (app)=>{
app.post(
    "/todoApp/api/v1/todo/creation/:userId",
    [todo_mw.checkTodoBody],
    todo_controller.todoCreation
);
app.get(
    "/todoApp/api/v1/todo/:userId",  
    todo_controller.getAllTodo
);
 app.put("/todoApp/api/v1/todo/:id",todo_controller.updateTodo);

 app.delete("/todoApp/api/v1/todo/:id" ,todo_controller.deletedTodo)

 }