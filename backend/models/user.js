const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 20,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        min: 3,
        max: 15,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        min: 15,
        max: 100,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    imageUrl: {
        type: String,
        trim: true,
        default: "avatar.png"
    },
    coverImageUrl: {
        type: String,
        trim: true,
        default: "cover.png"
    },
    aboutMe: {
        type: String,
        trim: true,
        default: "I'm using Reddot ^^"
    },
    saves:[{
        type: Object,
        ref:'Post',
    }],
},
{timestamps: true}
)

module.exports = mongoose.model("User",userSchema) ;