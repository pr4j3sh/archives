const { logger, secret } = require("./lib/utils");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "no token",
      });
    }
    const token = header.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "no token",
      });
    }

    try {
      const user = await jwt.verify(token, secret);
      console.log(user);
      req.user = user;
      next();
    } catch (error) {
      return res.status(403).json({
        message: "invalid token",
      });
    }
  } catch (error) {
    logger.error(error.message);
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = { authenticate };
