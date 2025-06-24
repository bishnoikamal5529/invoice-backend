const Customer = require('../models/customerModel.js');
const asyncWrapper = require('../utils/asyncWrapper.js');

// Create a new customer
const createCustomer = asyncWrapper(async (req, res) => {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();
    res.status(201).json(savedCustomer);
});

// Get all customers with pagination
const getAllCustomers = asyncWrapper(async (req, res) => {
    const { skip = 0, limit = 10 } = req.query;
    const customers = await Customer.find()
        .skip(parseInt(skip))
        .limit(parseInt(limit));
    res.status(200).json(customers);
});

// Get a single customer by ID
const getCustomerById = asyncWrapper(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
});

// Update a customer by ID
const updateCustomer = asyncWrapper(async (req, res) => {
    const updatedCustomer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(updatedCustomer);
});

// Delete a customer by ID
const deleteCustomer = asyncWrapper(async (req, res) => {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted successfully' });
});

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
};
