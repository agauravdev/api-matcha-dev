const Wishlists = require("../models/wishlist.model");
const asyncHandler = require("../utils/asyncHandler.util");

const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    res.json(cart.products || []);
});

const addToWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlists.findOne({ user: req.user._id });

    if (!wishlist) {
        const newWishlist = await Wishlists.create({
            user: req.user._id,
            products: [{ id: productId }],
        });

        res.status(201).json(newWishlist.products);
        return;
    }

    const itemIndex = wishlist.products.findIndex((product) => product.toString() === productId);
    console.log(wishlist.products);
    console.log({itemIndex});

    if (itemIndex >= 0) {
        return res.status(200).json(wishlist.products);
    } else {
        wishlist.products.push(productId);
    }
    res.status(201).json(wishlist.products);
});


const deleteWishlistItem = asyncHandler(async (req, res) => {
    const {productId} = req.body;
    const userId = req.user._id;

    const wishlist = await Wishlists.findOne({ user: userId });

    if (!wishlist) {
        return res.json([]);
    }

    const itemIndex = wishlist.products.findIndex((product) => product.toString() === productId);

    if(itemIndex>=0)
    {
        wishlist.products.splice(itemIndex, 1);
        await wishlist.save();
    } 

    res.json(wishlist.products);
})

module.exports = { getWishlist, addToWishlist, deleteWishlistItem };
