const { verifyToken } = require("../utils/jwt");

const auth = (req, res, next) => {
    const token = req.headers.authorization?.replace(/Bearer /, '');
    console.log({token});
    if(token) {
        req.user = verifyToken(token);
        console.log("in auth", req.user);
    }
    next();
}

module.exports = auth;