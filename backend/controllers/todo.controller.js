const mongoose = require("mongoose");
const todo_model = require("../models/todo.model");

exports.todoCreation = async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body; // Accept `status` from the request body

        // Validate the status, if provided
        const validStatuses = ["pending", "in-progress", "completed"];
        if (status && !validStatuses.includes(status)) {
            return res.status(400).send({
                message: "Invalid status. Valid options are 'pending', 'in-progress', or 'completed'."
            });
        }

        // Create the Todo
        const todo_data = await todo_model.create({
            title,
            description,
            dueDate,
            status, // Add the status field
            // userId
        });

        // Return the response, including the status
        res.status(201).send({
            message: "Successfully created todo!",
            data: {
                title: todo_data.title,
                description: todo_data.description,
                dueDate: todo_data.dueDate,
                status: todo_data.status, // Include the status in the response
                createdAt: todo_data.createdAt,
                updatedAt: todo_data.updatedAt
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            message: "Error while creating todo",
            error: err.message
        });
    }
};
