// JavaScript source code
import mongoose from "mongoose"
import User from "../models/users.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

//this function is used to create a new user
export const registerUser = async (req, res) => {

    try {
        const { userid, username, email, password } = req.body

        if (!username && !email && userid) {
            return res.status(400).send("username and email and userid are required")
        }

        if (!password) {
            return res.status(400).send("Password is required")
        }

        const userExist = await User.findOne({ userid: userid })

        const emailExist = await User.findOne({ email: email })


        if (userExist || emailExist) {
            return res.status(400).json({ message: "User already exists" })
        }

        //the below functionality encrypts the password with 10 no-of hash rounds.
        //large hash rounds == more secure == more time to encrypt.

        const hash = await bcrypt.hashSync(req.body.password, 10)
        const newUser = new User({ ...req.body, password: hash })

        await newUser.save()

        res.status(201).json({ message: "User created successfully", user: newUser })

    }
    catch (error) {
        console.error("Error Creating new user:", error)
        res.status(500).json({ message: "Internal server error" })
    }

}

//this function is used to login the user

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" })
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        //console.log(user.email)

        //this check performs password check if both the password and the encryped password are true

        const checkPassword = await bcrypt.compare(password, user.password)

        //console.log(checkPassword)

        if (!checkPassword) {
            return res.status(401).json({ message: "Invalid Credentials" })

        }

        //this const generates a token which will be active for 10hours and expires after that.
        //which means a user will be logged in for 10hours.

        const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "10hr" })

        console.log(token)
        //console.log(res.cookies.token)

        res.status(200).json({
            _id: user._id,
            userid:user.userid,
            username: user.username,
            email: user.email,
            channelId: user.channel ? user.channel.toString() : null, 
            token:token
            })
      
    }
    catch (err) {
        console.error("Error logging in user:", err)
        res.status(500).json({ message: "Internal server error" })
    }
}


//this function is used to delete the user
export const deleteUser = async (req, res) => {
    try {
        const { userid, password } = req.params
        const deletedUser = await User.findOne({ userid: userid })

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" })
        }
        const isPasswordValid = await bcrypt.compare(password, deletedUser.password)

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }
        else {
            deletedUser.remove()
        }
    }

    catch (error) {
        console.log("Error deleting user:", error)
        res.json({ message: "Internal server error" })
    }
}

//this function is used to get the user of a particular email

export const getUser = async (req, res) => {

    try {
        const email = req.params.email
        const users = await User.findOne({ email: email })

        res.status(200).json(users)
    }
    catch (err) {
        console.log("Error fetching user",err)
        res.json({message:"Error"})
    }
}

//this function is used to get the user of a particular id

export const getUserById = async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.id })

        res.status(200).json(user)
    }

    catch (err) {
        console.log("Cannot Get User",err)
    }

}






