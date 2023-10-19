const express = require("express");
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  uploadImage,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");
const { authenticate, authorizePermission } = require("../middlewares/auth");

router
  .route("/")
  .get(getAllProducts)
  .post(authenticate, authorizePermission("admin", "manager"), createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(authenticate, authorizePermission("admin", "manager"), updateProduct)
  .delete(authenticate, authorizePermission("admin", "manager"), deleteProduct);
router
  .route("/uploadImage")
  .post(authenticate, authorizePermission("admin", "manager"), uploadImage);
module.exports = router;
