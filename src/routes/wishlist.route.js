const express = require("express");
const { getWishlist, addToWishlist, deleteWishlistItem } = require("../controllers/wishlist.controller");
const wishlistRouter = express.Router();
const auth = require("../middlewares/auth.middleware");
const productCheck = require("../middlewares/productCheck.middleware");

wishlistRouter.use(auth);

wishlistRouter.route("/").get(getWishlist);

wishlistRouter.use(productCheck);

wishlistRouter.route('/').post(addToWishlist).delete(deleteWishlistItem);

module.exports = wishlistRouter;