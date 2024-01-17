const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();
const { isAuthMiddleware, isAdminMiddleware } = require("../middlewares");

router.get("/", isAuthMiddleware, productController.getAllProducts);
router.get("/:id", isAuthMiddleware, productController.getProductById);
router.post(
  "/",
  isAuthMiddleware,
  isAdminMiddleware,
  productController.createProduct
);
router.patch(
  "/update-product/:id",
  isAuthMiddleware,
  isAdminMiddleware,
  productController.updateProduct
);
router.delete(
  "/delete-product/:id",
  isAuthMiddleware,
  isAdminMiddleware,
  productController.deleteProduct
);


module.exports = router;
