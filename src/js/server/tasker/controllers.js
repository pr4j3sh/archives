const { logger, secret, client } = require("./lib/utils");
const Task = require("./models/post.model");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      res.status(409).json({ message: "Email already exists." });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      user: {
        email,
      },
      message: "user registered",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "user does not exist" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ message: "incorrect credentials" });
      return;
    }

    const token = await jwt.sign({ id: user._id, email }, secret, {
      expiresIn: "15m",
    });

    res.status(200).json({
      token,
      message: "user logged in",
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    const payload = await jwt.decode(token);

    const ttl = payload.exp * 1000 - Date.now();

    await client.set(`token:${token}`, token, { EX: ttl });

    res.status(200).json({ message: "logged out" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      data: tasks,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ _id: id });
    res.status(200).json({
      data: task,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    if (!title || !description || !priority) {
      return res.status(500).json({ message: "missing fields" });
    }

    const task = await Task.create({
      title,
      description,
      priority,
    });

    res.status(200).json({
      data: task,
    });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description, priority, isPending } = req.body;

    const task = await Task.findOne({ _id: id });

    if (title) task.title = title;
    if (description) task.description = description;
    if (priority) task.priority = priority;
    if (isPending !== undefined) task.isPending = isPending;

    await task.save();

    res.status(204);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    await Task.deleteOne({ _id: id });
    res.status(204);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  createTask,
  getTask,
  getTasks,
  updateTask,
  deleteTask,
};
