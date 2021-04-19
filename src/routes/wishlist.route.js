const express = require("express");
const { getWishlist } = require("../controllers/wishlist.controller");
const wishlistRouter = express.Router();
const auth = require("../middlewares/auth.middleware");
const productCheck = require("../middlewares/productCheck.middleware");

wishlistRouter.use(auth);
wishlistRouter.use(productCheck);

wishlistRouter.route("/").get(getWishlist);

module.exports = wishlistRouter;