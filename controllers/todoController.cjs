const { todoModel } = require("../models/todoSchema.cjs");

const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find();
    if (!todos) {
      return res.status(404).json({ message: "No todos found" });
    }
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todoModel.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "No todo found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  const { title, description, createdBy } = req.body;
  try {
    const newTodo = new todoModel({
      title,
      description,
      createdBy,
    });
    const todo = await newTodo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;
  try {
    const todo = await todoModel.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "No todo found" });
    }
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.completed = completed;
    const updatedTodo = await todo.save({ new: true, runValidators: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todoModel.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ message: "No todo found" });
    }
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
