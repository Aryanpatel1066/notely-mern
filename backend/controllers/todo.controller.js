const todo_model = require("../models/todo.model");

exports.todoCreation = async (req, res) => {
    try {
        const { title, description, dueDate, userId } = req.body;

         
        // Create the Todo using `create()`
        const todo_data = await todo_model.create({
            title,
            description,
            dueDate,
            userId
        });

        // Prepare response object
        const responseObject = {
            title: todo_data.title,
            description: todo_data.description,
            dueDate: todo_data.dueDate,
            createdAt: todo_data.createdAt,
            updatedAt: todo_data.updatedAt
        };

        // Send successful response
        res.status(201).send({
            message: "Successfully created todo!",
            data: responseObject
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Error while creating todo",
            error: err.message
        });
    }
};
