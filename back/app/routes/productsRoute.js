const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();

router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", productController.createProduct);
router.patch("/update-product/:id", productController.updateProduct);
router.delete("/delete-product/:id", productController.deleteProduct);


module.exports = router;
