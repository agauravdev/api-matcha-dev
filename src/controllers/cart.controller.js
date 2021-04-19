const isValidObjectId = require("../utils/isObjectId.util");
const Carts = require("../models/cart.model");
const asyncHandler = require("../utils/asyncHandler.util");

const getCart = asyncHandler(async (req, res) => {
    const cart = await Carts.findOne({ user: req.user._id }).populate('products.id');
    res.json(cart || []);
});

const addToCart = asyncHandler(async (req, res) => {
    const cart = await Carts.findOne({ user: req.user._id });
    const { productId } = req.body;

    if (!isValidObjectId(productId)) {
        res.status(400).json({ message: "ObjectId not valid" });
        return;
    }

    if (!cart) {
        const newCart = await Carts.create({
            user: req.user._id,
            products: [{ id: productId, quantity: 1 }],
        });

        res.status(201).json(newCart.products);
        return;
    }

    const itemIndex = cart.products.findIndex((product) => product.id.toString() === productId);

    if (itemIndex >= 0) {
        cart.products[itemIndex].quantity++;
        await cart.save();
    } else {
        cart.products.push({ id: productId, quantity: 1 });
    }
    res.status(201).json(cart.products);
});

const updateCart = asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Carts.findOne({ user: userId });

    if (!cart) {
        cart = new Carts({user : userId, products: []});
    }

    const itemIndex = cart.products.findIndex((product) => product.id.toString() === productId);

    if(itemIndex === -1) {
        cart.products.push({id: productId, quantity : quantity || 1})
    } else cart.products[itemIndex].quantity = quantity;

    await cart.save();

    res.json(cart.products);
});

const deleteCartItem = asyncHandler(async (req, res) => {
    const {productId} = req.body;
    const userId = req.user._id;

    const cart = await Carts.findOne({ user: userId });

    if (!cart) {
        res
            .status(400)
            .json({ message: "Please add something to the cart before trying to delete from it"});
        return;
    }

    const itemIndex = cart.products.findIndex((product) => product.id.toString() === productId);

    if(itemIndex>=0)
    {
        cart.products.splice(itemIndex, 1);
        await cart.save();
    } 

    res.json(cart.products);
})

module.exports = { getCart, addToCart, updateCart, deleteCartItem };
