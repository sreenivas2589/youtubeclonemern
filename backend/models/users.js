// JavaScript source code
import mongoose from "mongoose"

const userschema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique:true
    },
    username: {
        type: String,
        unique: true,
        required:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,

    },
    channel: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Channel"
    }
})

const User = mongoose.model("User", userschema)

export default User