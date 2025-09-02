import Video from "../models/videos.js"
import Channel from "../models/channel.js"
import User from "../models/users.js"


//this function handles the video uploads
export const UploadVideo = async (req, res) => {

    try {
        const { title, description, link, thumbnail,category } = req.body

        const channel = await Channel.findOne({owner:req.user.id})

        const video = await Video.create({
            /*videoid:"hello",*/
            title,
            description,
            link,
            thumbnail,
            category,
            uploader: req.user.id,
            channelid:channel._id,
        })


        channel.videos.push(video._id)

        await channel.save()

        res.status(201).json(video)


    }
    catch (err) {
        console.log("Error Occured while uploading video", err)
        res.status(500).json({error:err})
    }

}

//this function gets the video by the video id

export const GetVideo = async(req,res) => {
    try {

        const id = req.params.id

        const video = await Video.findOne({_id:id})

        if (!video) {
            res.status(404).json({message:"Video Not Found"})
        }

        res.status(200).json(video)
    }

    catch (err) {
        console.log("Cannot Get Videos", err)
        res.status(404).send(err)
    }

}

//this function is called when a user want to delete a particular video

export const DeleteVideo = async (req, res) => {
    try {

        const id = req.params.id

        const video = await Video.findById(req.params.id)

        const channel = await Channel.findById(video.channelid)

        if (channel.owner.toString() !== req.user.id) {
            return res.status("403").json({ message: "User Is not Authorized,Login from your own account to delete" })
        }

        await Video.findByIdAndDelete(video._id)

        await Channel.findOneAndUpdate({_id:channel._id}, { $pull: {videos:video._id} })

        res.status(200).json({message:"Video Deleted Succesully"})

    }

    catch (err) {
        console.log("Error", err)
        res.status(500).send("Error")
    }

}

//this function is called when the user wants to edit the video

export const EditVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id)

        const channel = await Channel.findById(video.channelid)

        if (channel.owner.toString() !== req.user.id) {
            return res.status("403").json({ message: "User Is not Authorized,Login from your own account to delete" })
        }

        const { newtitle, newdescription, newlink, newthumbnail, newcategory } = req.body


        await Video.findOneAndUpdate({_id:video._id},
            {
                title: newtitle,
                description: newdescription,
                link: newlink,
                thumbnail: newthumbnail,
                category: newcategory
            }
        )

        res.status(200).json({message:"Video Edited Successfully"})


    }

    catch (err) {
        console.log("Video Not Edited Successfully",err)
    }


}

//this function is used to get all the videos from the database

export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find()
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: err })
    }
}


//this function is called when a user want to comment on the video
export const CommentVideo = async (req, res) => {

    try {

        const { comment, videoid } = req.body

        const user = await User.findById(req.user.id)

        const channel = await Channel.findOne({owner:req.user.id})

        const video = await Video.findOne({ _id: videoid })

        video.comments.push({ userid: req.user.id, comment: comment, name: channel.channelname,banner:channel.banner })

        await video.save()

        res.json(video)
    }

    catch (err) {
        res.json({message:err})
    }
}

//this function is executed when a user wants to like a video

export const likeVideo = async (req, res) => {
    try {
        const { videoid } = req.body

        const video = await Video.findById(videoid)


        if (!video) {
            res.send("Video Not Found")
        }

        if (video.likedusers.includes(req.user.id)) {
            return res.json(video)
        }

        if (video.dislikedusers.includes(req.user.id)) {
            video.dislikedusers.pull(req.user.id)
            video.dislikes = Math.max(0, video.dislikes - 1);
        }


        video.likedusers.push(req.user.id)
        video.likes = video.likes + 1

        await video.save()

        res.json(video)
    }
    catch (err) {
        res.json({ message: err })
    }
}

//this function is executed when user wants to unlike the liked video

export const unlikeVideo = async (req, res) => {
    try {
        const { videoid } = req.body

        const video = await Video.findById(videoid)

        if (!video) {
            res.send("Video Not Found")
        }

        if (video.likedusers.includes(req.user.id)) {
            video.likedusers.pull(req.user.id)
            video.likes = Math.max(0, video.likes - 1)
        }

        //video.likes = video.likes - 1

/*        video.likes = Math.max(0, video.likes - 1)*/

        await video.save()

        res.json(video)
    }
    catch (err) {
        res.json({ message: err })
    }
}

//this function is executed when user wants to dislike video

export const dislikeVideo = async (req, res) => {
    try {
        const { videoid } = req.body

        const video = await Video.findById(videoid)

        if (!video) {
            res.send("Video Not Found")
        }

        if (video.dislikedusers.includes(req.user.id)) {
            res.json(video)
        }

        if (video.likedusers.includes(req.user.id)) {
            video.likedusers.pull(req.user.id)
            video.likes = Math.max(0, video.likes - 1) 
        }

        video.dislikedusers.push(req.user.id)

        video.dislikes = video.dislikes + 1

        await video.save()

        res.json(video)
    }
    catch (err) {
        res.json({ message: err })
    }

}

//this function is executed when user wants to remove the dislike of video

export const undislikeVideo = async (req, res) => {
    try {
        const { videoid } = req.body

        const video = await Video.findById(videoid)

        if (!video) {
            res.send("Video Not Found")
        }

        if (video.dislikedusers.includes(req.user.id)) {
            video.dislikedusers.pull(req.user.id)
            video.dislikes = Math.max(0, video.dislikes - 1)
        }

        await video.save()

        res.json(video)
    }
    catch (err) {
        res.json({ message: err })
    }
}

//this function is executed when user want to delete the comment.

export const DeleteComment = async (req, res) => {

    try {

        const { commentid, videoid } = req.body

        await Video.findByIdAndUpdate(videoid, {
            $pull: { comments: { _id: commentid } }
        })

        res.json("Comment Removed")
    }

    catch (err) {
        res.json({message:err})
    }
}


//this function is executed when the user wants to edit a comment.

export const EditComment = async (req, res) => {
    try {
        const { newcomment,videoid,commentid } = req.body

        await Video.updateOne({ _id: videoid, "comments._id": commentid }, { $set: { "comments.$.comment": newcomment } })

        res.json("Comment Edited")
    }

    catch (err) {
        res.json({ message: err })
    }
}

//this function is used to get a particular channel from the ownerid

export const GetChannelFromVideo = async (req, res) => {
    try {

        const channel = await Channel.findOne({ owner: req.params.id })

        if (!channel) {
            res.status(403).send("Channel Not Found")
        }

        res.status(200).json(channel)

    }
    catch (err) {
        res.status(403).json({message:err})
    }



}
