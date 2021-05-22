const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required for product']
    },
    description: {
        type: String,
        minLength: [100, 'Description should be minimum 100 letters'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    discount: {
        type: Number,
        min: [0, 'Discount can\'t be negative'],
        max: [0.9, 'Discount cannot be more than 90%'],
    },
    delivery:{
        type: Number,
        min: [1, 'Delivery cannot be made on the same day'],
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
    //ToDo make this default value draft when in prod
    status: {
        type: String, //ENUM : ACTIVE, DRAFT, DELETED
        required: true,
        default: "Active"
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    //ToDo make this required and impletent it
    availableInStock: {
        type: Number,
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