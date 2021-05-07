const asyncHandler = require("../utils/asyncHandler.util");
const bcrypt = require("bcrypt");
const sendOtp = require("../utils/sendEmail.util");
const crypto = require("crypto");
const Users = require("../models/user.model");
const OTPs = require("../models/otp.model");
const { signToken } = require("../utils/jwt");

const registerUser = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, username } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);

  const user = await Users.create({
    email: email.toLowerCase(),
    password: passwordHash,
    firstName,
    lastName,
    username
  });

  // Send OTP Here.
  
  res.json({ user: user.toShortJson(), token: signToken(user.toShortJson()) });
});

const requestNewOTP = asyncHandler(async (req, res) => {
  //To be implemented
  return res.status(204).end();
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email: email.toLowerCase() });

  if (!user)
    return res.status(401).json({ message: "Email or Password was incorrect" });

  if (user.blocked)
    return res
      .status(401)
      .json({ message: "You're blocked from accessing application" });

  if (!bcrypt.compareSync(password, user.password))
    return res.status(401).json({ message: "Email or Password was incorrect" });

  res.json({ user: user.toShortJson(), token: signToken(user.toShortJson()) });
});

const updateUser = asyncHandler(async (req, res) => {
  const userUpdates = req.body;
  const user = req.user;

  Object.keys(userUpdates).forEach((key) => {
    user[key] = userUpdates[key];
  });

  await user.save();

  res.json({ user: user.toShortJson(), token: signToken(user.toShortJson()) });
});

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!bcrypt.compareSync(oldPassword, userData.password)) {
    ctx.throw("Invalid old password", 401);
  }
  userData.password = bcrypt.hashSync(newPassword, 10);

  res.status(204).end();
});

const getSelfProfile = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toSafeJson() });
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  updatePassword,
  getSelfProfile,
  requestNewOTP,
};