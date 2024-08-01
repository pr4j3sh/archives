const mongoose = require("mongoose");

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
  { timestamp: true },
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
