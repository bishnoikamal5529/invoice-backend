const express = require('express');

const router = express.Router();

const {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
} = require('../controllers/supplierController');

// Define routes and bind them to the correct controller functions
router.post('/', createSupplier); // Create a new supplier
router.get('/', getSuppliers); // Get all suppliers
router.get('/:id', getSupplierById); // Get a supplier by ID
router.put('/:id', updateSupplier); // Update a supplier by ID
router.delete('/:id', deleteSupplier); // Delete a supplier by ID

module.exports = router;