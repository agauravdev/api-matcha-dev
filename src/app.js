require("dotenv").config();
const express = require('express');
const connectDB = require('./database');
const errorHandler = require("./middlewares/errorHandler.middleware");
const cartRouter = require("./routes/cart.route");
const productRouter = require("./routes/products.route");
const userRouter = require("./routes/user.route");
const wishlistRouter = require("./routes/wishlist.route");
const cors = require('cors');
const app = express()
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
  res.json({data: "Server is up and running"});
});

app.use('/cart', cartRouter);
app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/wishlist', wishlistRouter);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});