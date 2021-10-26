const router = require("express").Router();
const Message = require("../models/Message");
const verify = require("../verifyToken");


//SENDING MESSAGE
router.post("/send",verify, async (req, res)=>{
    const message = new Message({
      conversationId: req.body.conversationId,
      sender: req.body.user_id,
      text:req.body.text
    })
    try {
        const savedcomment = await message.save();
        res.status(201).json(savedcomment);
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
 })

//GET MESSAGE
 router.get("/:conversationId",verify,async (req,res)=>{
   try {
     const messages = await Message.find({
       conversationId:req.params.conversationId
     })
     res.status(200).json(messages);
   } catch (error) {
    res.status(500).json(err);
   }
 })

module.exports = router;