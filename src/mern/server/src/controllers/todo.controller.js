const createTodo = async (req, res) => {
  try {
    res.status(200).json({
      message: "todo created",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getTodos = async (req, res) => {
  try {
    res.status(200).json({
      message: "got todos",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getTodo = async (req, res) => {
  try {
    res.status(200).json({
      message: "got todo",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateTodo = async (req, res) => {
  try {
    res.status(200).json({
      message: "todo updated",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteTodo = async (req, res) => {
  try {
    res.status(200).json({
      message: "todo deleted",
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
}
