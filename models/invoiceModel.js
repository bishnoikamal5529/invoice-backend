const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    customerName: {
        type: String,
    },
    customerEmail: {
        type: String,
    },
    items: [
        {
            productSku: {type: String, required: true},
            productName: { type: String, required: true },
            productPrice : { type:Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    issueDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Overdue'],
        default: 'Unpaid',
    },
    issueUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
