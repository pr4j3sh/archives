const { logger } = require("./lib/utils");

const register = async (req, res) => {
  try {
    const { email, password } = req.body;
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
