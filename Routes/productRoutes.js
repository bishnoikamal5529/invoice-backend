const express = require('express');

const router = express.Router();

const {
        createProduct,
        getProducts,
        getProductById,
        updateProduct,
        deleteProduct,
} = require('../controllers/productController');

// Define routes and bind them to the controller functions
router.post('/', createProduct); // Create a new customer
router.get('/', getProducts); // Get all customers
router.get('/:id', getProductById); // Get a customer by ID
router.put('/:id', updateProduct); // Update a customer by ID
router.delete('/:id', deleteProduct); // Delete a customer by ID

module.exports = router;