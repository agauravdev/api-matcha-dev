const ensureAdmin = (req, res, next) => {
    if(req.user.type.toLowerCase() !== "admin")
        res.status(403).json({message: "Unauthorized"});
    else next();
}

module.exports = ensureAdmin;