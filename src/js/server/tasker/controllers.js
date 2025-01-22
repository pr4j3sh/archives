const { logger, secret } = require("./lib/utils");
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
      expiresIn: "1h",
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

    res.status(200).json({ message: "logged out" });
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, logout };
