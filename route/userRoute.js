const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
} = require("../controllers/userControllers");
const router = express.Router();
const { authenticate, authorizePermission } = require("../middlewares/auth");
router
  .route("/")
  .get(authenticate, authorizePermission("admin", "manager"), getAllUsers);
router.route("/showCurrentUser").get(authenticate, showCurrentUser);
router
  .route("/:id")
  .get(authenticate, authorizePermission, getSingleUser)
  .patch(authenticate, updateUser);
module.exports = router;
