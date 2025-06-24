const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique:[true, 'Customer Already exists with this email'],
            validate: {
                validator: function (v) {
                    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Industry-standard email regex
                },
                message: props => `${props.value} is not a valid email!`,
            },
        },
        phone: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return /^\+?[1-9]\d{1,14}$/.test(v); // E.164 international phone number format
                },
                message: props => `${props.value} is not a valid phone number!`,
            },
        },
        address: {
            type: String,
            required: false,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;