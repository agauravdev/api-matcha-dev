const OTPs = require("../models/otp.model");

const getOTP = (userId) => {
    let otp = await OTPs.findOne({ user: userId });

    if (!otp || new Date(otp.expiry) < new Date()) {
        otp = parseInt(crypto.randomBytes(3).toString("hex"), 16)
            .toString()
            .substr(0, 6);

        const expire = new Date();
        expire.setHours(expire.getHours() + 1);
        otp = await OTPs.create({ user: user._id, otp, expire });
    }
    return otp.otp;
}