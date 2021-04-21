const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
    if(err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({error : err.message});
    }
    res.status(500).json({error: err.message});
}

module.exports = errorHandler;