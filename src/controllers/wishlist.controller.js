const Wishlists = require("../models/wishlist.model");
const asyncHandler = require("../utils/asyncHandler.util");

const getWishlist = asyncHandler(async (req, res) => {
    const wishlist = await Wishlists.findOne({ user: req.user._id }).populate('products');
    res.json(wishlist?.products || []);
});

const addToWishlist = asyncHandler(async (req, res) => {
    const {productId} = req.body;
    const wishlist = await Wishlists.findOne({ user: req.user._id });

    if (!wishlist) {
        const newWishlist = await Wishlists.create({
            user: req.user._id,
            products: [productId],
        });
        const populatedWishlist = await newWishlist.populate('products').execPopulate();
        res.status(201).json(populatedWishlist.products);
        return;
    }

    const itemIndex = wishlist.products.findIndex((product) => product.toString() === productId);

    if (itemIndex < 0) {
        wishlist.products.push(productId);
        await wishlist.save();
    }
    
    const populatedWishlist = await wishlist.populate('products').execPopulate();
    res.status(201).json(populatedWishlist.products);
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
    const populatedWishlist = await wishlist.populate('products').execPopulate();
    res.json(populatedWishlist.products);
})

module.exports = { getWishlist, addToWishlist, deleteWishlistItem };
