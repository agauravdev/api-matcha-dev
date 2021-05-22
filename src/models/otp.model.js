const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'UserId is required to add OTP']
    },
    otp : {
        type: Number,
        required: [true, 'OTP is required'],
    },
    expire: {
        type: Date,
        required: [true, 'expiry date is required'],
    }
}, { timestamps: true });

const OTPs = mongoose.model('OTP', otpSchema);

module.exports = OTPs;