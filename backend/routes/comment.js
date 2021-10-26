const router = require("express").Router();
const Comment = require("../models/Comment");
const Notification = require("../models/Notification");
const Post = require("../models/Post");
const User = require("../models/User");
const verify = require("../verifyToken");

//CREATE COMMENT
router.post("/create",verify, async (req, res)=>{

    const post = await Post.findById(req.body.post_id);
    if(!post) return res.status(404).json("Post is not found!");
    const comment = new Comment({
      commentPost: req.body.post_id,
      commentUser: req.body.user_id,
      commentText: req.body.text,
    })

    const newCommentNotification = new Notification({
      activityUser: req.body.user_id,
      receivingUser: post?.author,
      content: `${(req.body.user_id).username} wrote a new comment in your post called "${post?.title}" `,
    })

    try {
        const savedcomment = await comment.save();
        await newCommentNotification.save();
        res.status(201).json(savedcomment);        
      } catch (err) {
        res.status(500).json(err);
        console.log(err);
      }
 })

 //GET COMMENT BY ID
 router.get("/getByID/:id" , async(req,res)=>{
     const {id} = req.params
    try {        
        const filteredPosts = await Comment.find({commentPost: id })        
        res.status(200).json(filteredPosts.reverse());
    } catch (error) {
        res.status(500).json(error)
    } 

 })

 //UPDATE COMMENT
router.put("/:id",verify, async (req, res) => {
  try {
    const updateComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).json(error)
  }
})

//ADD REPLY COMMENT
router.put("/reply/:id",verify, async (req, res) => {
  const { commentText,commentUser,commentPost } = req.body;
  const comment = new Comment({
    commentPost: req.body.commentPost,
    commentUser: req.body.commentUser,
    commentText: req.body.commentText,
  })
  const commentID = await Comment.findById(req.params.id);
  if(!commentID) return res.status(404).json("Comment doesn't exist!");
  try {
    await commentID.updateOne({ $push: { replies: comment } });
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).json(error)
  }
})

 //DELETE COMMENT
 router.delete("/:id",verify, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("The Post has been deleted!")
  } catch (error) {
    res.status(500).json(error);
  }
})

//UPVOTE COMMENT
router.put("/upvote/:id",verify, async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  const user = await User.findById(req.body.user_id);
  if (!user) return res.status(404).json("User not found! You must login!");

  const isUpVoted = comment.upvotedBy.includes(user._id);

  if (!comment) return res.status(404).json("Post does not exist!");


  if (!isUpVoted) {
    await comment.updateOne({ $push: { upvotedBy: user._id } });
    await comment.updateOne({ $pull: { downvotedBy: user._id } });
    res.status(200).json("You upvoted!");
  } else {
    await comment.updateOne({ $pull: { upvotedBy: user._id } });
    res.status(200).json("Your upvote is returned!");
  }

})

//DOWNVOTE COMMENT
router.put("/downvote/:id",verify, async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  const user = await User.findById(req.body.user_id);
  if (!user) return res.status(404).json("User not found! You must login!");

  const isDownVoted = comment.downvotedBy.includes(user._id);

  if (!comment) return res.status(404).json("Comment does not exist!");


  if (!isDownVoted) {
    await comment.updateOne({ $push: { downvotedBy: user._id } });
    await comment.updateOne({ $pull: { upvotedBy: user._id } });
    res.status(200).json("You downvoted!");
  } else {
    await comment.updateOne({ $pull: { downvotedBy: user._id } });
    res.status(200).json("Your downvote is returned!");
  }

})

 module.exports = router ;