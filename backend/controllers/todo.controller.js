const todo_model = require("../models/todo.model");
const user_model = require("../models/user.model");
const mongoose = require("mongoose");

exports.todoCreation = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).send({
        message: "Todo title is required",
      });
    }

    if (!description || description.trim() === "") {
      return res.status(400).send({
        message: "Todo description is required",
      });
    }

    const userId = req.params.userId; // Get `userId` from URL params

    // Check if the user exists
    const user = await user_model.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Create and save the todo
    const newTodo = await todo_model.create({
      title,
      description,
      userId, // Use userId from the URL
    });

    res.status(201).send({
      message: "Todo successfully created!",
      data: newTodo,
    });
  } catch (err) {
    console.error("Error while creating todo:", err);
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
    console.error("Error while fetching todos:", err);
    res.status(500).send({
      message: "Error while fetching todos",
      error: err.message,
    });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    // Check if any data was provided for update
    if (!Object.keys(updatedData).length) {
      return res.status(400).send({
        message: "No data provided for update",
      });
    }

    // Find and update the Todo item
    const updatedTodo = await todo_model.findByIdAndUpdate(id, updatedData, { new: true });

    // Check if Todo not found
    if (!updatedTodo) {
      return res.status(404).send({
        message: "Todo not found",
      });
    }

    res.status(200).send({
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (err) {
    console.error("Error updating Todo:", err);
    res.status(500).send({
      message: "Error while updating the Todo",
      error: err.message,
    });
  }
};

exports.deletedTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the todo
    const deletedTodo = await todo_model.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).send({
        message: "Todo not found or already deleted",
      });
    }

    res.status(200).send({
      message: "Todo was deleted",
      data: deletedTodo,
    });
  } catch (err) {
    console.error("Error while deleting the Todo:", err);
    res.status(500).send({
      message: "Error while deleting the Todo",
      error: err.message,
    });
  }
};
