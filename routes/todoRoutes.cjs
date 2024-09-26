const express = require("express");
const router = express.Router();
const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController.cjs");

router.get("/", getTodos);
router.get("/get-todo/:id", getTodo);
router.post("/create", createTodo);
router.put("/update-todo/:id", updateTodo);
router.delete("/delete/:id", deleteTodo);

module.exports = router;
