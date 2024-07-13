const fs = require("fs");
const bcrypt = require("bcryptjs");
const { database } = require("../../app.config");

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("fill in all the fields");
    }

    const content = await fs.readFileSync(database);
    const existingUser = JSON.parse(content);
    if (existingUser.username === username) {
      throw new Error("user already exists");
    }
    const hash = await bcrypt.hash(password, 10);
    const user = { username, password: hash };
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
    if (!username || !password) {
      throw new Error("fill in all the fields");
    }
    const content = await fs.readFileSync(database);
    const user = JSON.parse(content);
    if (user.username !== username) {
      throw new Error("user not found");
    }
    const isAuthorised = await bcrypt.compare(password, user.password);
    if(!isAuthorised){
      throw new Error("invalid credentials")
    }
    res.status(200).json({ message: "user logged in", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
