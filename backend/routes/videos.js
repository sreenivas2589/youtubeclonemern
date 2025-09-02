// JavaScript source code
import express from "express"
import { verifyToken } from "../authentication/auth.js"
import { UploadVideo } from "../controllers/video.js"
import { GetVideo } from "../controllers/video.js"
import { DeleteVideo } from "../controllers/video.js"
import { EditVideo } from "../controllers/video.js"
import { getVideos } from "../controllers/video.js"
import { CommentVideo } from "../controllers/video.js"
import { DeleteComment } from "../controllers/video.js"
import { EditComment } from "../controllers/video.js"
import { GetChannelFromVideo } from "../controllers/video.js"
import { likeVideo } from "../controllers/video.js"
import { unlikeVideo } from "../controllers/video.js"
import { dislikeVideo } from "../controllers/video.js"
import { undislikeVideo } from "../controllers/video.js"

const app = express()


function videoRoutes(app) {
    
    //protected routes
    app.post("/api/upload", verifyToken, UploadVideo)
    
    app.delete("/api/video/:id", verifyToken, DeleteVideo)
    app.put("/api/video/:id", verifyToken, EditVideo)
    app.put("/api/comment", verifyToken, CommentVideo)
    app.put("/api/commentdelete", verifyToken, DeleteComment)
    app.patch("/api/commentedit", verifyToken, EditComment)
    app.patch("/api/likevideo", verifyToken, likeVideo)
    app.patch("/api/unlikevideo", verifyToken, unlikeVideo)
    app.patch("/api/dislikevideo", verifyToken, dislikeVideo)
    app.patch("/api/undislikevideo", verifyToken, undislikeVideo)

    //unprotected routes
    app.get("/api/video/:id", GetVideo)
    app.get("/api/getchannelfromvideo/:userid", GetChannelFromVideo)
    app.get("/api/videos", getVideos)
}


export default videoRoutes