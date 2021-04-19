const asyncHandler = require("../utils/asyncHandler.util");
const bcrypt = require("bcrypt");
const sendOtp = require("../utils/sendEmail.util");
const crypto = require("crypto");
const Users = require("../models/user.model");
const OTPs = require("../models/otp.model");

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    const user = await Users.create({ email: email.toLowerCase(), password: passwordHash, firstName, lastName });

    const otp = parseInt(crypto.randomBytes(3).toString('hex'), 16).toString().substr(0,6);

    const expire = new Date();
    expire.setHours(expire.getHours() + 1);

    await OTPs.create({user: user._id, otp, expire});
    
    sendOtp(email, otp).then(console.log).catch(console.log);

    res.status(201).json({ user });
});

const requestNewOTP = asyncHandler(async (req, res) => {
    const otp = await OTPs.findOne({user: req.user._id});
    if(new Date(otp.expiry) < Date())
        otp.otp = parseInt(crypto.randomBytes(3).toString('hex'), 16).toString().substr(0,6);
    expire = new Date();
    expire.setHours(expire.getHours() + 1);
    otp.expire = expire;
    sendOtp(req.user.email, otp.otp).then(console.log).catch(console.log);
    return res.status(204).emd();
})


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await Users.findOne({ email: email.toLowerCase() });

    if (!userData) return res.status(401).json({ message: "Email or Password was incorrect" });

    if (userData.blocked) return res.status(401).json({ message: 'You\'re blocked from accessing application' });

    if (!bcrypt.compareSync(password, userData.password)) return res.status(401).json({ message: "Email or Password was incorrect" });

    res.json({ user: user.toShortJson() });
});

const updateUser = asyncHandler(async (req, res) => {
    const userUpdates = req.body;
    const user = req.user;

    Object.keys(userUpdates).forEach(key => {
        user[key] = userUpdates[key];
    });

    await user.save();

    res.json({ user: user.toShortJson });
});

const updatePassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!bcrypt.compareSync(oldPassword, userData.password)) {
        ctx.throw('Invalid old password', 401);
    }
    userData.password = bcrypt.hashSync(password, 10);

    res.status(204);
});

const getSelfProfile = asyncHandler(async (req, res) => {
    res.json({ user: req.user.toSafeJson() });
});


module.exports = { registerUser, loginUser, updateUser, updatePassword, getSelfProfile, requestNewOTP }