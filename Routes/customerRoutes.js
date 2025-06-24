const express = require('express');

const router = express.Router();

const {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
} = require('../controllers/customerController');

// Define routes and bind them to the controller functions
router.post('/', createCustomer); // Create a new customer
router.get('/', getAllCustomers); // Get all customers
router.get('/:id', getCustomerById); // Get a customer by ID
router.put('/:id', updateCustomer); // Update a customer by ID
router.delete('/:id', deleteCustomer); // Delete a customer by ID

module.exports = router;