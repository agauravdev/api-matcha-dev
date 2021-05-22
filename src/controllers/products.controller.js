const Products = require("../models/products.model");
const asyncHandler = require("../utils/asyncHandler.util");

const getProducts = asyncHandler( async (req, res) => {
    const products = await Products.find({});
    res.json(products);
});

const getProductById = asyncHandler( async (req, res) => {
    res.json(res.product).end();
});

const addProduct = asyncHandler(async (req, res) => {
    const product = req.body;
    const userId = req.user._id;

    const newProduct = await Products.create({
        ...product,
        addedBy: userId,
    });

    res.status(201).json(newProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
    const productUpdates = req.body;
    const product = req.product;

    Object.keys(productUpdates).forEach( key => {
        product[key] = productUpdates[key];
    });

    await product.save();
    res.json(product);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const { product } = req;

    product.status = "DELETED";

    await product.save();

    res.status(204).end();
});

module.exports = {getProducts, deleteProduct, updateProduct, addProduct, getProductById};