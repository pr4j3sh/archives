const {
  deleteUser,
  getUser,
  signIn,
  signUp,
  updateUser,
} = require("../controllers/user.controller");

const express = require("express");

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/user/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
