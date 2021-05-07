const jwt = require('jsonwebtoken');

const key = process.env.JWTKEY;

const signToken = (userData) => jwt.sign(userData, key);

const verifyToken = (token) => jwt.verify(token, key);

module.exports = {signToken, verifyToken};