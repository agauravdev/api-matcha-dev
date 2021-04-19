const express = require("express");
const { getProducts, addProduct, updateProduct, deleteProduct, getProductById } = require("../controllers/products.controller");
const productRouter = express.Router();
const auth = require("../middlewares/auth.middleware");
const ensureAdmin = require("../middlewares/ensureAdmin.middleware");
const productCheck = require("../middlewares/productCheck.middleware");

productRouter.use(auth);

productRouter.route("/").get(getProducts).post(ensureAdmin, addProduct);

productRouter.use(productCheck);
productRouter.route("/:id").get(getProductById).post(ensureAdmin, updateProduct).delete(ensureAdmin, deleteProduct);

module.exports = productRouter;