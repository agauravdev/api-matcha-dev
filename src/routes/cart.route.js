const express = require("express");
const { getCart, deleteCartItem, updateCart } = require("../controllers/cart.controller");
const cartRouter = express.Router();
const auth = require("../middlewares/auth.middleware");
const productCheck = require("../middlewares/productCheck.middleware");

cartRouter.use(auth);

cartRouter.get("/", getCart)

cartRouter.use(productCheck)

cartRouter.route("/").post(updateCart).delete(deleteCartItem);

module.exports = cartRouter;