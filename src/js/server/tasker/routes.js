const express = require("express");
const { register, login, logout } = require("./controllers");
const { authenticate } = require("./middlewares");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(authenticate, logout);

module.exports = router;
