// JavaScript source code
import { useState } from "react"
import axios from "axios"
import { useAuth } from "../storage/localstorage.jsx"
import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { useOutletContext } from "react-router-dom"

function Upload() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [title, settitle] = useState("")
    const [link, setlink] = useState("")
    const [thumbnail, setthumbnail] = useState("")
    const [description, setdescription] = useState("")
    const [category, setcategory] = useState("")


    const [_, __, sidebartwodisplay, width] = useOutletContext()

    //this function handles video uploading 
    // this only works when all the fields are entered.
    const uploadvideo = async (e) => {
        e.preventDefault()

        if (!title || !description || !category || !thumbnail || !link) {
            alert("Enter All Fields")
            return
        }

        try {
            await axios.post("http://localhost:3000/api/upload",
                { title: title.trim(), description: description.trim(), category: category.trim(), thumbnail: thumbnail.trim(), link: link.trim()},
                { headers: { Authorization: `Bearer ${user.token}` } }

            ).then(resp => console.log(resp.data))

            alert("Video Uploaded")
            navigate("/channel")
        }
        catch (err) {
            console.log("error Occured", err)
        }


    }

    //this component handles video upload feature.
    //with all the info present this page creates a new video and displays it in the channel page

    return (
        <>
            {!user?.channelId ? (
                <div className="uploadvideo" style={{ width: (width > 840 && sidebartwodisplay) ? `${width - 120}px` : (width > 840 ? `${width - 320}px` : `${width - 110}px`), marginLeft: sidebartwodisplay && "80px", backgroundColor: "white" }}>
                    <p style={{ color: "black", fontSize: "1.4rem", fontWeight: "600" }} className="notuploadpara">Create a Channel to upload videos</p>
                    <NavLink to="/channel"><button>Channel</button></NavLink>
                </div>) : (
            <div className="uploadvideo" style={{ width: (width > 840 && sidebartwodisplay) ? `${width - 120}px` : (width > 840 ? `${width - 320}px` : `${width - 110}px`), marginLeft: sidebartwodisplay && "80px" }}>
                <NavLink to="/channel">
                    <button>Go Back</button>
                </NavLink>
                <h1>Upload</h1>
                <input placeholder="enter Video Title " onChange={(e) => settitle(e.target.value)} required type="text" maxLength="100"></input>
                <input placeholder="Enter Video LInk" onChange={(e) => setlink(e.target.value)} required></input>
                <input placeholder="Enter Thumbnail Url" onChange={(e) => setthumbnail(e.target.value)} required></input>
                <input placeholder="enter Video Description" onChange={(e) => setdescription(e.target.value)} required></input>
                <input placeholder="enter video category" onChange={(e) => setcategory(e.target.value)} required maxLength="15"></input>
                <button onClick={uploadvideo}>Submit</button>
            </div>)
            }
        </>        
    )


}


export default Upload