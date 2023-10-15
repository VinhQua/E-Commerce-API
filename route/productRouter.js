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
router.route("/").get(getAllProducts).post(createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);
router.route("/uploadImage").post(uploadImage);
module.exports = router;
