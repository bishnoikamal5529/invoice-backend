const express = require('express');

const router = express.Router();

const {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
} = require('../controllers/invoiceController');

// Define routes and bind them to the controller functions
router.post('/', createInvoice); // Create a new invoice
router.get('/', getInvoices); // Get all invoices
router.get('/:id', getInvoiceById); // Get an invoice by ID
router.put('/:id', updateInvoice); // Update an invoice by ID
router.delete('/:id', deleteInvoice); // Delete an invoice by ID

module.exports = router;