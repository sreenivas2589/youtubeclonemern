// JavaScript source code
import jwt from "jsonwebtoken"


export const verifyToken = (req, res, next) => {

    const headerforauth = req.headers.authorization;

    let token = req.headers.authorization?.split(" ")[1]

    console.log(token)
    

    if (!token) {

        return res.status(401).send("You are not authenticated!")
    }

    try {
        jwt.verify(token, "secret", (err, user) => {

            req.user = user

        })
    }

    catch (err) {
        return res.status(403).json({ error: "Forbidden, secretkey is incorrect or not entered.Please enter secret key" })
    }

    next()

}