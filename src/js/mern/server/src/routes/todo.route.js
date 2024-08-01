const express = require("express");
const {
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

const router = express.Router();

router.route("/").get(getTodos);
router.route("/:todoId").get(getTodo).put(updateTodo).delete(deleteTodo);

module.exports = router;
