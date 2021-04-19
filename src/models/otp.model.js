const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    otp : {
        type: Number,
        required: true,
    },
    expire: {
        type: Date,
        required: true,
    }
}, { timestamps: true });

const OTPs = mongoose.model('OTP', otpSchema);

module.exports = OTPs;