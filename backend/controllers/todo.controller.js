const todo_model = require("../models/todo.model");
const user_model = require("../models/user.model");
const mongoose = require("mongoose");

exports.todoCreation = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validate required fields
    if (!title?.trim()) {
      return res.status(400).json({ message: "Todo title is required" });
    }

    // Validate status if provided
    const validStatuses = ["ToDo", "In Progress", "Completed"];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const userId = req.user?.id || req.params.userId; // Use from auth or params
    console.log("Received userId:", userId);  // Log the userId to ensure it's correct

    // Check if the user exists
    const userExists = await user_model.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the todo
    const newTodo = await todo_model.create({
      title,
      description: description?.trim() || " ",
      status: status || "ToDo",
      userId,
    });

    res.status(201).json({
      message: "Todo successfully created!",
      data: newTodo,
    });
  } catch (err) {
    console.error("Error while creating todo:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.getAllTodo = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate the `userId`
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({ message: "Invalid userId" });
    }

    // Fetch all todos associated with the `userId`
    const todos = await todo_model.find({ userId });

    // Always return a 200 response with an empty array if no todos found
    res.status(200).send({
      message: "Todos fetched successfully",
      todos: todos || [],  // Ensure always sending an empty array if no todos exist
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
 