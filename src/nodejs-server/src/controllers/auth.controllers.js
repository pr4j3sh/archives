const fs = require("fs");
const { database } = require("../../app.config");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = { username, password };
    await fs.writeFileSync(database, JSON.stringify(user));
    res.status(201).json({ message: "user registered", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password });
    res.status(200).json({ message: "user logged in" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
