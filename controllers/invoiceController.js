const Invoice = require('../models/invoiceModel');
const Product = require('../models/productModel');
const { updateProduct } = require('../controllers/productController');
const asyncWrapper = require('../utils/asyncWrapper');

// Create a new invoice
const createInvoice = asyncWrapper(async (req, res) => {  
    // Exxtracting user if provided in req.user through auth token
    const userID = req.user[0]._id.toString();
    req.body.issueUser = userID;

    // checking if asked products quantity is not more than in stock
    const productArray = req.body.items;
    const productIds = productArray.map(element => {
        return element.product;
    });
    
    // get all the products by productIds array
    const products = await Product.find({ _id: {$in: productIds } });
    
    //check if asked quantity in invoice is not more that currently in stock
    let inStock = true;
    for(let i=0; i<productArray.length; i++){
        if(productArray[i].quantity > products[i].quantityInStock){
            inStock = false;
            return res.status(500).json({message: "there is not enough quantityInStock for this product", productId: productArray[i].product});
        }
    }


    const invoice = new Invoice(req.body);   
    // make changes in product quantities before saving invoice
    for(let i=0; i<productArray.length; i++){
        products[i].quantityInStock -= productArray[i].quantity;
        await products[i].save();
    }
    await invoice.save();    

    res.status(201).json({ success: true, data: invoice });
});

// Get all invoices
const getInvoices = asyncWrapper(async (req, res) => {
    const invoices = await Invoice.find();
    res.status(200).json({ success: true, data: invoices });
});

// Get a single invoice by ID
const getInvoiceById = asyncWrapper(async (req, res) => {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
        return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.status(200).json({ success: true, data: invoice });
});

// Update an invoice by ID
const updateInvoice = asyncWrapper(async (req, res) => {
    const userID = req.user[0]._id.toString();
    req.body.issueUser = userID;
    
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!invoice) {
        return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.status(200).json({ success: true, data: invoice });
});

// Delete an invoice by ID
const deleteInvoice = asyncWrapper(async (req, res) => {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
        return res.status(404).json({ success: false, message: 'Invoice not found' });
    }
    res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
});

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
};
