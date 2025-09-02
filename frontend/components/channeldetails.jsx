// JavaScript source code
import { useAuth } from "../storage/localstorage.jsx"
import {useEffect,useState } from "react"
import axios from "axios"
import { useNavigate, useOutletContext } from "react-router-dom"
import VideoDisplay from "../components/videodisplay.jsx"
import loadinggif from "../icons/loadinggif.gif"
import close from "../icons/close.png"
function ChannelDetails() {

    //this component display all the required information related to the particular channel.
    // we can also edit and delete videos,we can also edit the inforation related to the channel.

    const [channel, setchannel] = useState({})
    const [videos, setvideos] = useState([])
    const [newchannelname, setnewchannelname] = useState("")
    const [newchanneldescription, setnewchanneldescription] = useState("")
    const [newchannelprofilepic, setnewchannelprofilepic] = useState("")
    const [newchannelbanner, setnewchannelbanner] = useState("")
    const [loading,setloading] = useState(true)

    const [_, __, ___, width] = useOutletContext()

    const [customizechannel, setcustomizechannel] = useState(false)
    const [viewdescription,setviewdescription] = useState(false)

    const { user } = useAuth()

    const navigate = useNavigate()

    const editchannel = async () => {
        //this function gets triggered when the user wants to edit the channel info.

        if (!newchannelname || !newchanneldescription || !newchannelprofilepic || !newchannelbanner) {
            alert("Enter all required fields")
            return
        }

        // axios will make a put api call to the database and make required changes given by the user. 
        try {
            await axios.put(`http://localhost:3000/api/channel/${user.channelId}`,
                { channelname: newchannelname.trim(), description: newchanneldescription.trim(), profilepicture: newchannelprofilepic.trim(), banner: newchannelbanner.trim() },
                { headers: { Authorization: `Bearer ${user.token}` } })
                .then(resp => console.log(resp))

            window.location.reload()
        }

        // if there is an error then it will return the error.
        catch (err) {
            console.log(err)

        }
    }

    useEffect(() => {

        // this useeffect hook 

        const getchanneldetails = async() => {
            if (user) {

                //this function gets the details of the channel with the given user id.
                //if the channel is not present then it will return an error which is dealt using "catch" statement

                try {
                    axios.get(`http://localhost:3000/api/channel/${user?._id}`, { headers: { Authorization: `Bearer ${user.token}` } }).then(resp => {
                        setchannel(resp.data)
                        setvideos(resp.data.videos)
                    })
                }
                catch (err) {
                    console.log("Cannot Get Channel", err)
                }
                finally {
                    setloading(false)
                }
            }
        }

        getchanneldetails()

    }, [user?.channelId])

    console.log(channel)
    console.log(videos)

    console.log(width)


    //this component provides all the necessary information regarind to the particular channel.
    // all functions such as uploading videos,cutomizing channel can only be dont if the user is logged in and they have a channel.
    return (
        <>
            
            {loading && <img src={loadinggif} className="loadinggif" alt="loading"></img>}
            <img src={channel.banner} alt="hello" className="banner" style={
                { width: width > 840 ? `${width - 320}px` : `${width - 120}px`  }
            } />
            <div className="channeldetails">
                <div>
                    <img src={channel.profilepicture} alt="hello" />
                    
                </div>
                <div>
                    <p>{channel.channelname}</p>  
                    {/*<h2>{channel.videos.length}</h2>*/}
                    <p>Subscribers:{channel.subscribers}</p>
                    <p>Videos:{videos.length}</p>
                    <p style={{ fontWeight:"500" }}>Owner:{user?.username}</p>
                    
                </div>
            </div>
            <div className="channelvideoupload">
                <button onClick={() => navigate("/upload")}>Upload Video</button>
                <button onClick={() => setcustomizechannel(!customizechannel)}>Customize Channel</button>
                <button onClick={() => setviewdescription(!viewdescription)}>Description</button>
            </div>
            <div className={viewdescription ? "viewdescriptionshow" : "viewdescription"}>
                <div className="viewdescriptiondiv">
                    <p>{channel?.description}</p>
                    <div style={{ position: "absolute", top: "0", right: "0", cursor: "pointer" }} onClick={() => setviewdescription(!viewdescription)}>
                        <img src={close} style={{ height: "60px", width:"60px" }}></img>
                    </div>
                </div>

            </div>
            <div className={customizechannel ? "customizechannelshow" : "customizechannel"}>
                <div className="customizechanneldiv">
                    <p style={{ fontFamily: "Raleway", fontSize: "1.2rem", fontWeight:"600" }}>Edit Channel</p>
                    <input placeholder="Enter new channel name" onChange={(e) => setnewchannelname(e.target.value)} maxLength="30" id="newchannelname"></input>
                    <input placeholder="Enter new description" onChange={(e) => setnewchanneldescription(e.target.value)} maxLength="556" id="newchanneldescription"></input>
                    <input placeholder="Enter new profile picture" onChange={(e) => setnewchannelprofilepic(e.target.value)} id="newchannelprofile"></input>
                    <input placeholder="Enter new banner" onChange={(e) => setnewchannelbanner(e.target.value)} id="newchannerbanner"></input>
                    <div>
                        <button onClick={editchannel}>Submit</button>
                        <button onClick={() => setcustomizechannel(!customizechannel)}>Close</button>
                    </div>
                    
                </div>

            </div>
            <div className="channeldetailsbtn">
                <button>Home</button>
                <button>Videos</button>
                <button>Playlists</button>
                <button>Posts</button>
            </div>
            <div className="videocardchannel">
                {videos.map((id, index) => {

                    return (
                        <VideoDisplay id={id} key={index} />
                    )
                })}
            </div>

        </>
    )

}

export default ChannelDetails