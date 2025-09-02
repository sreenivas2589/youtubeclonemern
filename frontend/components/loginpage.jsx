// JavaScript source code
import google from "../icons/google.png"
import { useNavigate, NavLink, useOutletContext } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import homepage from "../icons/homepage.png"
import { useAuth } from "../storage/localstorage.jsx"

//import { useDispatch, useSelector } from "react-redux"

function LoginAndRegister() {

    const { user, setUser } = useAuth()

    const navigate = useNavigate()

    const [_, __, sidebartwodisplay, width] = useOutletContext()

    const [loginemail, setloginemail] = useState("")
    const [loginpassword, setloginpassword] = useState("")
    const [loginfail,setloginfail] = useState(false)

    //const dispatch = useDispatch()
    //const userstate = useSelector((state)=>state.user)

    const handleLogin = async(e) => {
        e.preventDefault()
        try {
            const res  = await axios.post("http://localhost:3000/api/login", { email: loginemail, password: loginpassword },
                //headers: {
                //    "Content-Type": "application/json" // send content type in header
                //}
            )

            console.log(res)

            setUser(res.data)

            alert("Login Successfull")

            navigate("/")
        }
        catch (err) {
            console.log(err, "login failed")
            setloginfail(true)
        }
    }

    //this is a login page which display sign in and sign up options.
    //if the user is not signed in then it display all the necessary info to sign in.
    //if the user is signed in then it will display "already signed in"

    return (
        <>
            {user ? (
                <div className="alreadyloggedin">
                    <h1>Already logged In</h1>
                    <NavLink to="/channel"><button>Go To Channel</button></NavLink>
                </div>
                ) : 
            (<><header style={{ height: "30px" }}>
                <img src={homepage} onClick={() => navigate("/")} style={{ height: "50px", width: "50px", cursor:"pointer" }} />
            </header>
            //marginLeft: sidebartwodisplay && "140px"
                    <div className="login" style={{ width: (width > 840 && sidebartwodisplay) ? `${width - 120}px` : (width > 840 ? `${width - 320}px` : `${width - 110}px`), marginLeft: sidebartwodisplay && "90px" }}>
                <div>
                    <img src={google} alt="google"></img>
                    <h1>Sign In</h1>
                    <p>with your Google Account to continue to YouTube. This account will be available to other Google apps in the browser.</p>

                </div>
                <div>
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Enter Email" id="email" onChange={(e) => setloginemail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter Password" id="password" onChange={(e) => setloginpassword(e.target.value)} />
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"row",flexWrap:"wrap",width:"250px",gap:"40px"}}>
                        <button onClick={handleLogin}>Login</button>
                        <NavLink to="/register"><button>Sign Up</button></NavLink>
                    </div>
                    <p style={{ opacity: loginfail ? 1 : 0, fontSize: "1.2rem" }}>{loginfail && "Username And Password Does not match"}</p>
                    
                </div>
            </div></>)
            }
        </>
    )
 }

export default LoginAndRegister