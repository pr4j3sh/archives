const { default: mongoose } = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    priority: Number,
    isPending: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
