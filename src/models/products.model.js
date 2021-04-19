const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for product']
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        max: 0.9,
    },
    delivery:{
        type: Number,
        min: 1,
    },
    details: {
        type: Object,
    },
    images: {
        type: [{ type: String }],
    },
    mainImage: {
        type: String
    },
    status: {
        type: String, //ENUM : ACTIVE, DRAFT, DELETED
        required: true,
        default: "Draft"
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    questions: {
        type: [
            {
                question: {
                    type: String,
                    required: true,
                },
                answer: {
                    by: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User",
                        required: true
                    },
                    text: {
                        type: String
                    }
                }
            }
        ]
    },
    reviews: {
        type: [
            {
                rating: {
                    type: Number,
                    min: 0,
                    max: 5,
                    required: true,
                },
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                review: {
                    type: String
                }
            }
        ]
    }
}, { timestamps: true });

const Products = mongoose.model('Product', productSchema);

module.exports = Products;