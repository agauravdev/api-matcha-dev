const { verifyToken } = require("../utils/jwt");

const auth = (req, res, next) => {
    const token = req.headers.authorization?.replace(/Bearer /, '');
    if(token) {
        try{
            req.user = verifyToken(token);
        } catch (e) {
            return res.status(401).json({message: "Unauthorized"});
        }
    }
    next();
}

module.exports = auth;