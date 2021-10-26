const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 100,
        trim: true
    },
    postType: {
        type: String,
        required: true,
    },
    postCategory: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    author: {
        type: String,
        ref: 'User',
    },
    upVote: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    downVote: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],

},
    { timestamps: true }
)

module.exports = mongoose.model("Post", postSchema);