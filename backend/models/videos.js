// JavaScript source code
import mongoose from "mongoose"

const videoformatSchema = new mongoose.Schema({
    //videoid: {
    //    type: String,
    //    required: true,
    //    unique: true
    //},

    title: {
        type: String,
    },

    link: {
        type:String
    },

    thumbnail: {
        type: String
    },

    description: {
        type: String,
    },

    channelid: {
        type: mongoose.Schema.Types.ObjectId,
    },

    uploader:{
        type: mongoose.Schema.Types.ObjectId
    },

    views: {
        type: Number,
        default:100
    },

    likes: {
        type: Number,
        default: 0
    },

    dislikes: {
        type: Number,
        default:0
    },

    uploadDate: {
        type: String,
        default: new Date().toString()
    },

    category: {
        type:String
    },

    comments: [{
        userid:  {type: mongoose.Schema.Types.ObjectId },
        comment: { type: String },
        name: { type: String },
        banner: {type:String}
    }],

    likedusers: [{
        type: mongoose.Schema.Types.ObjectId
    }],

    dislikedusers: [{
        type: mongoose.Schema.Types.ObjectId
    }]
})

const Video = mongoose.model("Video", videoformatSchema)

export default Video

