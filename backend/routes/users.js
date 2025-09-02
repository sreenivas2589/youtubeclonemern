// JavaScript source code
import { registerUser, loginUser, deleteUser, getUser,getUserById } from "../controllers/users.js"
import express from "express"
import { verifyToken } from "../authentication/auth.js"

const app = express()

function userRoutes(app) {

    //unprotected routes
    app.post("/api/register", registerUser)
    app.post("/api/login",loginUser)
    app.delete("/api/deleteuser", deleteUser)
    app.get("/api/users/:id", getUserById)

    //protected
    app.get("/api/users/:email", verifyToken, getUser)
    
}

export default userRoutes