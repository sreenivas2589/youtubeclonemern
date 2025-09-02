// JavaScript source code
import express from 'express'
import mongoose from "mongoose"

import userRoutes from "./routes/users.js"
import videoRoutes from './routes/videos.js';
import commentRoutes from './routes/comment.js';
import channelRoutes from './routes/channel.js';

import cookieParser from "cookie-parser"
import cors from "cors"

//this constant invokes the express application 
const app = express()

//this makes the application use the builtin middleware functions

app.use(express.json())
app.use(cookieParser())
app.use(cors())

//this connects the backend to mongo database

mongoose.connect("mongodb://127.0.0.1:27017")

const db = mongoose.connection

//if the database is succesfully connected then it will return as "connected to mongodb"
db.on("open", () => {
    console.log("Connected to MongoDB")
})

//if there is an error then it will raise an error to the console
db.on("error", (err) => {
    console.log("Error connecting to MongoDB:", err)

})

//this is the middleware which is invoked for every route called.

app.use(function (req, res, next) {
    console.log("Middleware executed")
    console.log(`Request Method: ${req.method}`)
    console.log(`Request URL: ${req.url}`)
    console.log("")
    next()
})

//all the routes are defined here below

userRoutes(app)
channelRoutes(app)
videoRoutes(app)
commentRoutes(app)


app.listen(3000, () => {
    console.log('Server is running on port 3000')

})