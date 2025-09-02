// JavaScript source code
import mongoose from "mongoose"
import { createChannel, getChannel, DeleteChannel, getAllChannels, getChannelbyid, EditChannel, getChannelbyOwner, getChannelByName } from "../controllers/channel.js"
import express from "express"
import { verifyToken } from "../authentication/auth.js"

const app = express()

function channelRoutes(app) {
    //protected routes
    app.post("/api/channel", verifyToken, createChannel)
    app.get("/api/channel/:userId", verifyToken, getChannel)
    app.post("/api/channel/:channelId", verifyToken, DeleteChannel)
    app.put("/api/channel/:channelId", verifyToken, EditChannel)

    //unprotected routes

    app.get("/api/channels", getAllChannels)
    app.get("/api/getchannel/:id", getChannelbyid)
    app.get("/api/channelbyowner/:ownerid", getChannelbyOwner)
    app.get("/api/channelname/:name", getChannelByName)
}

export default channelRoutes
