const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true
            },
            quantity: {
                type: Number,
                min: [0, 'Quantity cannot be negative'],
                required: true,
                default: 1,
            },
        }
    ]
}, { timestamps: true });

const Carts = mongoose.model('Cart', cartSchema);

module.exports = Carts;