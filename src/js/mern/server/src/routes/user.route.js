const express = require("express");

const {
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const router = express.Router();

router.route("/:userId").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
