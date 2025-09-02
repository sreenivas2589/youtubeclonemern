// JavaScript source code
import mongoose from "mongoose"

const channelschema = new mongoose.Schema({

    channelname: {
        type: String,
        required:true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    description: {
        type: String,

    },
    profilepicture: {
        type: String,
    },
    banner: {
        type: String,
    },
    subscribers: {
        type: Number,
        default:0
    },

    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }]
})

const Channel = mongoose.model("Channel", channelschema)

export default Channel