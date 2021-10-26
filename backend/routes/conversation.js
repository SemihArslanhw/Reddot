const router = require("express").Router();
const Conversation = require("../models/Conversation");
const verify = require("../verifyToken");

//new conv
router.post("/",verify,async (req,res)=>{
    const newConversation = new Conversation({
        members:[req.body.senderId,req.body.receiverId],
    })
    try{
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    }catch(err){
        res.status(500).json(err)
    }
})

//get conv of a user

router.get("/:userId",async (req,res)=>{
    try {
        const conversation = await Conversation.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error)
    }
})
module.exports = router;