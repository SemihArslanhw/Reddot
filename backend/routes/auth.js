const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  const existUserByMail = await User.findOne({email : req.body.email});
  const existUserByUsername = await User.findOne({username : req.body.username});
  if(existUserByMail) return res.status(400).json("There is a registered user with this email address.");
  if(existUserByUsername) return res.status(400).json("There is a registered user with this username.");
  try {    
    console.log(newUser)
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);    
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const { email, password} = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user) return res.status(404).json("User doesn't exist!");

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (originalPassword !== password) return res.status(400).json("Password is not matching!");

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY , { expiresIn: "5d" });

    res.status(200).json({ result: user, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
});


module.exports = router;