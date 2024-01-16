const express = require("express");
const productController = require("../controller/productController");
const router = express.Router();

router.get("/", productController.getAllProducts);

module.exports = router;
