// JavaScript source code
import Channel from "../models/channel.js"
import User from "../models/users.js"

//this function creates the channel with all the necessary info
export const createChannel = async (req, res) => {
    try {

        const { channelname, banner, description, profilepicture } = req.body

        const existingchannel = await Channel.findOne({ channelname: channelname })

        if (existingchannel) {
            return res.status(400).json({ message: "Channel already exists" })
        }

        const newchannel = await Channel.create({
            channelname: channelname,
            banner: banner,
            description: description,
            profilepicture: profilepicture,
            owner: req.user.id
        })

        await User.findByIdAndUpdate(req.user.id, { channel: newchannel._id })

        res.status(201).json({
            ...newchannel.toObject(),
            channelId: newchannel._id.toString()
        })

        //const { channelid, channelname, banner, description } = req.body
    }
    catch (err) {
        console.log("error", err)
    }
}

//this function helps to get the channel based on the userid
export const getChannel = async (req, res) => {
    try {
        const ownerid = req.params.userId

        const channel = await Channel.findOne({ owner: ownerid })

        console.log(channel)

        if (!channel) {
            res.status(404).json({message:"Channel Not Found"})
        }

        res.json(channel)

    }
    catch (err) {
        res.status(500).json(err)
    }
}

//this function is used to delete the channel
export const DeleteChannel = async (req, res) => {
    try {
        const id  = req.params.channelId

        const channel = Channel.findOne({ channelid: id })

        if (channel && channel.owner !== req.body.id) {

            res.send("Unathorized")
        }

        if (channel) {
            res.status(404).send("Channel Not Found")
        }

        await Channel.deleteOne({ channelid: channelid })

        res.json({ message: "Channel Deleted Successfully" })

    }
    catch (err) {
        res.json({message:err})
    }


}

//this function is used to edit the channel
export const EditChannel = async (req, res) => {
    try {

        const { channelname, description, profilepicture,banner } = req.body

        await Channel.findOneAndUpdate({ _id: req.params.channelId }, {
            channelname: channelname,
            description: description,
            profilepicture: profilepicture,
            banner:banner
        })

        res.json("Channel edit Successfully")
    }

    catch (err) {
        res.status(500).json({message:`Cannot Edit Channel ${err}`})
    }
}


//this channel is used to get the channel with the channel id.
export const getChannelbyid = async (req, res) => {
    try {

        const channel = await Channel.findById(req.params.id)

        if (!channel) {
            res.status(404).json({ message: "Channel Not Foudwnd" })
        }

        res.json({
            ...channel.toObject(),
            channelId: channel._id.toString()
        })

    }
    catch (err) {
        res.status(500).json({message:err})
    }



}

//this function gets all the channels from the database

export const getAllChannels = async (req, res) => {
    try {
        const Channels = await Channel.find()

        res.status(200).json(Channels)
    }

    catch (err) {
        console.log("Cannot Retrieve All Channels",err)
    }
}

//this functions finds the channel by it's channel name

export const getChannelByName = async (req, res) => {
    try {
        const channel = await Channel.findOne({ channelname: req.params.name})

        if (!channel) {
            res.status(403).send("Channel Not found")
        }

        res.status(200).json(channel)

    }

    catch (err) {

        res.status(403).json({message:err})
    }



}

//this function finds the channel by the ownerid.


export const getChannelbyOwner = async (req, res) => {
    try {
        const owner = req.params.ownerid

        const channel = await Channel.findOne({owner:owner})

        res.status(200).json(channel)
    }

    catch (err) {
        res.status(403).send("Cannot Fetch Channel",err)
    }

}
