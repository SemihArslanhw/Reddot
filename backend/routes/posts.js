const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const verify = require("../verifyToken");


//SET NEW POST
router.post("/newPost",verify, async (req, res) => {
  const newPost = new Post({
    title: req.body.title,
    postType: req.body.postType,
    postCategory: req.body.postCategory,
    text: req.body.text,
    image: req.body.image,
    author: req.body.author
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id",verify, async (req, res) => {
  try {
    const updatePost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json(error)
  }
})

//DELETE POST
router.delete("/:id",verify, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    const deleteComments = await Comment.find({ commentPost: req.params.id })    
    deleteComments.map(async (res)=>{
      await Comment.findByIdAndDelete(res._id);
    })
    res.status(200).json("The Post has been deleted!")
  } catch (error) {
    res.status(500).json(error);
  }
})

//GET POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
})

//GET CATEGORY POSTS
router.get("/category/:category", async (req, res) => {
  try {
    const categoryPosts = await Post.find({ postCategory: req.params.category });
    res.status(200).json(categoryPosts.reverse());
  } catch (err) {
    res.status(500).json(err);
  }
})

//GET POST
router.get("/find/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
})

//GET USER POSTS
router.get("/profile/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ author: user.username });
    res.status(200).json(posts.reverse());
  } catch (error) {
    res.status(500).json(error);
  }
})

//UPVOTE POST
router.put("/upvote/:id",verify, async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.body.user_id);
  if (!user) return res.status(404).json("User not found! You must login!");

  const isUpVoted = post.upVote.includes(user._id);

  if (!post) return res.status(404).json("Post does not exist!");


  if (!isUpVoted) {
    await post.updateOne({ $push: { upVote: user._id } });
    await post.updateOne({ $pull: { downVote: user._id } });
    res.status(200).json("You upvoted!");
  } else {
    await post.updateOne({ $pull: { upVote: user._id } });
    res.status(200).json("Your upvote is returned!");
  }

})

//DOWNVOTE POST
router.put("/downvote/:id",verify, async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.body.user_id);
  if (!user) return res.status(404).json("User not found! You must login!");

  const isDownVoted = post.downVote.includes(user._id);

  if (!post) return res.status(404).json("Post does not exist!");


  if (!isDownVoted) {
    await post.updateOne({ $push: { downVote: user._id } });
    await post.updateOne({ $pull: { upVote: user._id } });
    res.status(200).json("You downvoted!");
  } else {
    await post.updateOne({ $pull: { downVote: user._id } });
    res.status(200).json("Your downvote is returned!");
  }

})

//SAVE POST
router.put("/save/:id",verify, async (req, res) => {
  const { id } = req.params;
  const { post } = req.body;
  
  const user = await User.findById(id);
  if (!user) return res.status(404).json("User not found! You must login!");
  if (!post) return res.status(404).json("Post does not exist!");
  const isSaved = (user.saves).some((x) => x._id === post._id);
  if (isSaved) {
    await user.updateOne({ $pull: { saves: post } });
    res.status(200).json("Your save is returned!");
  } else {
    await user.updateOne({ $push: { saves: post } });
    res.status(200).json("This post is saved!");
  }
})

module.exports = router;