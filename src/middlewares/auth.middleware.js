const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if(token) {
        req.user = {type: "admin", name: "Gaurav", _id: "507f1f77bcf86cd799439011"};
    }
    next();
}

module.exports = auth;