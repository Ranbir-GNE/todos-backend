const { Schema, default: mongoose } = require("mongoose");

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const todoModel = mongoose.model("todo", todoSchema);
module.exports = {
  todoModel,
};
