const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentPost: {
    type: String,
    require: true,
  },
  commentUser: {
    type: Object,
    ref: 'User',
  },
  commentText: {
    type: String,
    trim: true
  },
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  downvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  replies: [{
    type: Object,
    ref: 'Comment',
  }],
},
  { timestamps: true }
)

module.exports = mongoose.model("Comment", commentSchema);