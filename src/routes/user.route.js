const express = require("express");
const router = express.Router();
const { registerUser, loginUser, updateUser, updatePassword, getSelfProfile } = require("../controllers/user.controller");
const userRouter = express.Router();
const auth = require("../middlewares/auth.middleware");
const Users = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler.util");

userRouter.post('/', registerUser);

userRouter.use(auth);

router.get('/', getSelfProfile);

router.param('id', asyncHandler(async (req, res, next, id) => {
    let user;

    if (isValidObjectId(id)) {
        user = await Users.findById(id);
        if (user) {
            req.user = user;
            next();
            return;
        }
    } 
    
    res.status(404).json({ message: "No User with this ID is present." }).end();
}));

router.post('/:id', updateUser)

router.post('/login', loginUser);

router.post("/updatePassword", updatePassword);

module.exports = userRouter;