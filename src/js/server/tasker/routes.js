const express = require("express");
const { register } = require("./controllers");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post();
router.route("/logout").get();

module.exports = router;
