const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        trim: true,
        default:" "
      },
      dueDate: {
        type: Date,
       },
      status: {
        type: String,
        enum: ['pending', 'completed', 'in-progress'],
        default: 'pending'
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
},{timestamps:true,versionKey:false});

module.exports = mongoose.model("todo",todoSchema)