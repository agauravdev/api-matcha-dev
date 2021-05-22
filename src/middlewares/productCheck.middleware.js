//AskTanay : Should I put this middleware in some other folder or name it differently, because it's being used only in the cart and wishlist routes

const Products = require("../models/products.model");
const asyncHandler = require("../utils/asyncHandler.util");
const isValidObjectId = require("../utils/isObjectId.util");

const productCheck = asyncHandler(async (req, res, next) => {
    const { productId } = req.body || req.params.id;

    let product;

    if (isValidObjectId(productId)) {
        product = await Products.findById(productId);
        if (product) {
            req.product = product;
            next();
            return;
        }
    }
    res.status(404).json({ message: "No Product with this ID is present." }).end();
});

module.exports = productCheck;

