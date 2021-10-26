const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");


//GET USER
router.get("/find", async (req, res) => {
    const username = req.query.username;
    try {
        const user = await User.findOne({ username: username });
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error)
    }
})

//GET USER BY ID
router.get("/get/:id",async (req,res)=>{
    const userId = req.params.id
    try {
        const user = await  User.findById(userId)
        const {password , ...info} = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error);        
    }
})

//GET ALL USERS
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(10) : await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)
    }
})

//DELETE USER
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id) {

        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted!");
        } catch (error) {
            res.status(500).json(error);
        }

    } else {
        res.status(403).json("You can delete only your account!")
    }
})

//UPDATE USER
router.put("/:id", verify, async (req, res) => {

    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
    }

    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body.updatedUser }, { new: true });
        res.status(200).json(updateUser);
    } catch (error) {
        res.status(500).json(error);
    }


})

module.exports = router;