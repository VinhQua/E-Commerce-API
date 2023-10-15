const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/").get(getAllUsers);
router.route("/showCurrentUser").get(showCurrentUser);
router.route("/:id").get(getSingleUser);
module.exports = router;
