// JavaScript source code
import { useState,useEffect } from "react"
import { useAuth } from "../storage/localstorage.jsx"
import axios from "axios"
//import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"

import loadinggif from "../icons/loadinggif.gif"
import dots from "../icons/dots.png"

function VideoDisplay(props) {

    const { user } = useAuth()

    const [newtitle, setnewtitle] = useState("")
    const [newlink, setnewlink] = useState("")
    const [newthumbnail, setnewthumbnail] = useState("")
    const [newdescription, setnewdescription] = useState("")
    const [newcategory, setnewcategory] = useState("")
    const [loading, setloading] = useState(true)
    const [imageclicked,setimageclicked] = useState(true)

    const [inputdisplay, setinputdisplay] = useState(true)
    //const [closecliked,setclosecliked] = useState(false)

    const id = props.id

    //const navigate = useNavigate()

    const [video, setvideo] = useState({})

    console.log(id)
    console.log(video)

    //this function handles the deletion of the video 
    const DeleteVideo = async (id) => {
        
        try {
            await axios.delete(`http://localhost:3000/api/video/${id}`,{ headers: { Authorization: `Bearer ${user.token}` } })
            .then(resp => console.log(resp))

            window.location.reload()
        }
        catch (err) {
            console.log("Error Occured",err)
        }

    }
    
    //this function handles editing of the video parameters such as thumbnail,name,link,description
    const EditVideo = async (id) => {

        if (!newtitle || !newlink || !newthumbnail || !newdescription || !newcategory) {
            alert("All Fields are required")
            return 
        }

        try {
            await axios.put(`http://localhost:3000/api/video/${id}`,
                { newtitle: newtitle.trim(), newdescription: newdescription.trim(), newlink: newlink.trim(), newthumbnail: newthumbnail.trim(), newcategory: newcategory.trim() },
                { headers: { Authorization: `Bearer ${user.token}` } })
                .then(resp => console.log("Video Edited Succesfully", resp))

            alert("Video Edited Successfully")

            

            window.location.reload()
        }
        catch (err) {
            console.log("Error Occured while editing",err)
        }
    }
    

    useEffect(() => {

        //this function gets the video by it's required id
        //if the video is not found then it will throw an error.
        const getvideobyid = async() => {
            try {
                axios.get(`http://localhost:3000/api/video/${id}`)
                    .then(resp => {
                        setvideo(resp.data)
                        //setnewtitle(resp.data.title)
                    })
            }
            catch (err) {
                console.log("Failed to load channel videos", err)
            }
            finally {
                setloading(false)
            }
        }

        getvideobyid()

    }, [id])

    const { title, thumbnail, views, _id } = video

    //this component displays all the video present in a particular channel.
    //this also includes features like videoedit and videodelete

    return (
        <>
            <div className="videosinchannel">
                
                {loading && <img src={loadinggif} className="loadinggif" alt="loading"></img>}
                <NavLink to={`/video/${_id}`} target="_blank" style={{ textDecoration: "none" }}>
                <div className="videoimage">
                    <img src={thumbnail} alt="somethumbnail"></img>
                </div>
                </NavLink>
                <div className="videotitledisplay">
                    <div>
                         <p>{title}</p>
                    </div>
                    <div>
                       <p>views:{views}</p>
                       <button className="dotbutton" onClick={
                                () => {
                                    setimageclicked(!imageclicked)
                                }
                                } style={{backgroundColor:(imageclicked == false) && "grey"}}><img src={dots} style={{ height: "20px", width: "20px" }} />
                        </button>
                        <div className={imageclicked ? "editbuttonshide" : "editbuttons"}>
                            <button onClick={() => {
                                setinputdisplay(false)
                            }
                            }>Edit</button>
                            <button onClick={() => DeleteVideo(video._id)}>Delete</button>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div className={inputdisplay ? "newinputdisplay" : "newinputdisplayshow"}>
                <div className="newinputs">
                    <label htmlFor="newtitle">Title</label>
                    <input placeholder="Enter new Video Title " onChange={(e) => setnewtitle(e.target.value)} id="newtitle" maxLength="100"></input>
                    <label htmlFor="newvideolink">Video Link</label>
                    <input placeholder="Enter new Video LInk" onChange={(e) => setnewlink(e.target.value)} id="newvideolink"></input>
                    <label htmlFor="newthumbnail">Thumbnail</label>
                    <input placeholder="Enter new Thumbnail Url" onChange={(e) => setnewthumbnail(e.target.value)} id="newthumbnail"></input>
                    <label htmlFor="newdesc">Description</label>
                    <input placeholder="Enter new Video Description" onChange={(e) => setnewdescription(e.target.value)} id="newdesc"></input>
                    <label htmlFor="newcat">Category</label>
                    <input placeholder="Enter new video category" onChange={(e) => setnewcategory(e.target.value)} id="newcat" maxLength="15"></input>
                    <div>
                        <button onClick={() => EditVideo(video._id)}>Submit</button>
                        <button onClick={() => setinputdisplay(true)}>Close</button>
                    </div>
                </div>
            </div>
        
        </>
        
    )
}


export default VideoDisplay