const Product = require('../models/productModel');
const asyncWrapper = require('../utils/asyncWrapper');

// Create a new product
const createProduct = asyncWrapper(async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product });
});

// Get all products
const getProducts = asyncWrapper(async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
});

// Get a single product by ID
// Get a single product by ID
const getProductById = asyncWrapper(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
});

// Update a product by ID
const updateProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
});

// Delete a product by ID
const deleteProduct = asyncWrapper(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
});

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};