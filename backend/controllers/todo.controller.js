const user_model = require("../models/user.model")
const todo_model = require("../models/todo.model")
const mongoose = require('mongoose')
exports.todoCreation = async (req, res) => {
    try {
        const userId = req.params.userId; // Extract `userId` from the URL

        const { title, description, dueDate, status } = req.body;

        // Validate the status
        const validStatuses = ["pending", "in-progress", "completed"];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).send({
                message: "Invalid status. Valid options are 'pending', 'in-progress', or 'completed'."
            });
        }

        // Check if the user exists (optional, for validation)
        const user = await user_model.findById(userId);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Create and save the todo
        const newTodo = await todo_model.create({
            title,
            description,
            dueDate,
            status,
            userId, // Use userId from the URL
        });

        res.status(201).send({
            message: "Todo successfully created!",
            data: newTodo,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Error while creating todo",
            error: err.message,
        });
    }
};
exports.getAllTodo = async (req, res) => {
    try {
        const { userId } = req.params; // Extract `userId` from the URL

        // Validate the `userId`
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: "Invalid userId" });
        }

        // Fetch all todos associated with the `userId`
        const todos = await todo_model.find({ userId });

        // Check if no todos are found
        if (todos.length === 0) {
            return res.status(404).send({ message: "No todos found for the given userId" });
        }

        res.status(200).send({
            message: "Todos fetched successfully",
            todos,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Error while fetching todos",
            error: err.message,
        });
    }
};
