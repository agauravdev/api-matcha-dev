const ensureAdmin = (req, res, next) => {
    if(req.user.type !== "admin")
        res.status(403).json({message: "Unathorized"})
    else next();
}

module.exports = ensureAdmin;