const Product = require("../models/products");
const asyncHandler = require("express-async-handler");

// desc: get all products from MongoDB
// route: GET
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().lean();
  if (!products.length) {
    return res.status(400).json({ message: "No data found! " });
  }
  res.json(products);
});

// desc: Create new product
// route: POST
const createNewProduct = asyncHandler(async (req, res) => {
  const { sku, name, description, price } = req.body;
  const newSKU = '';

  if (!sku || !name || !description || !price) {
    return res
      .status(400)
      .json({ message: "SKU, name, description and price are required!" });
  }

  // check for duplicate data
  const duplicate = await Product.findOne({ sku }).lean().exec();

  if (duplicate) {
    return res
      .status(409)
      .json({ message: `Duplicate sku ${sku}. Sku should be unique.` });
  }

  const newProduct = { sku, name, description, price };

  const product = await Product.create(newProduct);

  if (product) {
    res.status(201).json({ message: `New product ${sku} with ${product.id} created.` });
  } else {
    res.status(400).json({ message: "Invalid product data!" });
  }
});

// desc: Update product
// route: PATCH
const updateProduct = asyncHandler(async (req, res) => {
  const { id, sku, name, description, price } = req.body;

  if (!id || !name || !price) {
    return res
      .status(400)
      .json({ message: "id, name and price are required!" });
  }

  const product = await Product.findById({_id: id}).exec();

  if (!product) {
    return res.status(400).json({ message: `Product ${id} not found!` });
  }

  product.name = name;
  product.description = description;
  product.price = price;

  const updatedProduct = await product.save();

  res.status(201).json({ message: `Product ${sku} updated!` });
});

// desc: Delete product
// route: DELETE
const deleteProduct = asyncHandler(async (req, res) => {
  const { id, sku } = req.body;

  if (!id) {
    return res.status(400).json({ message: "id is required!" });
  }

  const product = await Product.findById({_id: id}).exec();

  if (!product) {
    return res.status(400).json({ message: `Product ${sku} not found!` });
  }

  const deletedProduct = await product.deleteOne();
  res.json({ message: `Product ${sku} deleted!` });
});

module.exports = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
