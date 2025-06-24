const Supplier = require('../models/supplierModel');
const asyncWrapper = require('../utils/asyncWrapper');

// Create a new supplier
const createSupplier = asyncWrapper(async (req, res) => {
    const supplier = new Supplier(req.body);
    await supplier.save();
    res.status(201).json({ message: 'Supplier created successfully', supplier });
});

// Get all suppliers
const getSuppliers = asyncWrapper(async (req, res) => {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
});

// Get a single supplier by ID
const getSupplierById = asyncWrapper(async (req, res) => {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
});

// Update a supplier by ID
const updateSupplier = asyncWrapper(async (req, res) => {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier updated successfully', supplier });
});

// Delete a supplier by ID
const deleteSupplier = asyncWrapper(async (req, res) => {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier) {
        return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json({ message: 'Supplier deleted successfully' });
});

// Export all controllers together
module.exports = {
    createSupplier,
    getSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};
