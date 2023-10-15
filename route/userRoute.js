const express = require("express");
const router = express.Router();
const { getAllUser, createUser } = require("../controllers/userControllers");
router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get().patch().delete();
module.exports = router;
