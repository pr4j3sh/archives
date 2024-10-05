const User = require("../models/user.model");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw new Error("fields cannot be empty");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("user already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(200).json({ message: "signUp", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("fields cannot be empty");
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
      throw new Error("user does not exist");
    }

    const user = await User.findOne({ email, password });
    if (!user) {
      throw new Error("incorrect credentials");
    }

    res.status(200).json({ message: "signIn", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("user not found");
    }

    res.status(200).json({ message: "getUser", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, password } = req.body;

    const user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("user not found");
    }

    if (name) {
      user.name = name;
    }
    if (password) {
      user.password = password;
    }

    await user.save();

    res.status(200).json({ message: "updateUser", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const temp = await User.findOne({ _id: id });
    if (!temp) {
      throw new Error("user not found");
    }

    const user = await User.findOneAndDelete({ _id: id });

    res.status(200).json({ message: "deleteUser", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  signIn,
  signUp,
  getUser,
  updateUser,
  deleteUser,
};
