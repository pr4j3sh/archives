const { logger, secret, client } = require("./lib/utils");
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

    const cache = await client.get(`token:${token}`);
    if (cache) {
      return res.status(401).json({
        message: "token revoked",
      });
    }

    jwt.verify(token, secret, (err, payload) => {
      if (err) {
        return res.status(403).json({
          message: "invalid token",
        });
      }
      req.user = payload;
      next();
    });
  } catch (error) {
    logger.error(error.message);
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = { authenticate };
