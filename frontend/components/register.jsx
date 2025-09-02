import axios from "axios"
import { useNavigate, NavLink, useOutletContext } from "react-router-dom"
//import { useAuth } from "../storage/localstorage.jsx"
import { useState } from "react"

//this components is used to register new user.
// with all the necessary information enter this page will create a new user.


function Register() {

    //const { userinfo, setuserinfo } = useStorage()

    const navigate = useNavigate()
    const [_, __, sidebartwodisplay,width] = useOutletContext()
    const [newusername, setnewusername] = useState("")
    const [newemail, setnewemail] = useState("")
    const [newpassword, setnewpassword] = useState("")
    const [newuserid, setnewuserid] = useState("")

    //this function registers the new user and thrown an alert even if one of the field is not entered.
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            if (!newusername || !newemail || !newpassword || !newuserid ) {
                alert("Please enter all fields")
                return
            }

            axios.post("http://localhost:3000/api/register", { userid: newuserid.trim(), username: newusername.trim(), email: newemail.trim(), password: newpassword }).then(resp => {
                if (resp.status == 400) {
                    alert(resp.response?.data?.message)
                }
                console.log(resp)
            })

            
            alert("User registered successfully,Please Login")
            navigate("/")

        }
        catch (error) {
            console.log("Registration not complete", error)
            alert("Registration failed ",(error.response?.data?.message))
        }
    }

    //all the necessary input fields required for the registration of new user will be dispalyed here.
    return (
        <div className="register" style={{ width: (width > 840 && sidebartwodisplay) ? `${width - 120}px` : (width > 840 ? `${width - 280}px` : `${width - 110}px`), marginLeft: sidebartwodisplay && "90px"}}>
            <h1>Register</h1>
            <label htmlFor="useridnew">User ID</label>
            <input type="text" placeholder="Enter User Id" id="useridnew" onChange={(e) => setnewuserid(e.target.value)} maxLength="20" />
            <label htmlFor="usernamenew">Username</label>
            <input type="text" placeholder="Enter Username" id="usernamenew" onChange={(e) => setnewusername(e.target.value)} maxLength="10" />
            <label htmlFor="emailnew">Email</label>
            <input type="email" placeholder="Enter Email" id="emailnew" onChange={(e) => setnewemail(e.target.value)} maxLength="40" />
            <label htmlFor="passwordnew">Password</label>
            <input type="password" placeholder="Enter Password" id="passwordnew" onChange={(e) => setnewpassword(e.target.value)} maxLength="16" />
            <button onClick={handleRegister}>Register</button>
        </div>
    )
}

export default Register

