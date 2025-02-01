const mongoose = require('mongoose');
/**
 * design schema for todos
 * title: title of todo
 * descriptin: desctiption of todo
  */
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
         trim: true
      },
      description: {
        type: String,
        trim: true,
        default:" "
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
        ref: 'user',
        required:true
       }
},{timestamps:true,versionKey:false});

module.exports = mongoose.model("todo",todoSchema)