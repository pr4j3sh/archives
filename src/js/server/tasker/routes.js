const express = require("express");
const {
  register,
  login,
  logout,
  getTasks,
  createTask,
  deleteTask,
  updateTask,
  getTask,
} = require("./controllers");
const { authenticate } = require("./middlewares");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authenticate, logout);

router.route("/").get(authenticate, getTasks).post(authenticate, createTask);
router
  .route("/:id")
  .get(authenticate, getTask)
  .put(authenticate, updateTask)
  .delete(authenticate, deleteTask);

module.exports = router;
