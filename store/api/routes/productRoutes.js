const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router
  .route("/")
  .get(productController.getAllProducts) //get all products
  .post(productController.createNewProduct) //create new product
  .patch(productController.updateProduct) //update product
  .delete(productController.deleteProduct); //delete product

module.exports = router;
