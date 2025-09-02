// JavaScript source code
import { useParams } from "react-router-dom"
import photo from "../icons/youtube.png"
import like from "../icons/like.png"
import dislike from "../icons/dislike.png"
import share from "../icons/share.png"
import downloadicon from "../icons/downloadicon.png"
import Recommendation from "./recommendations.jsx"
import { useEffect, useState } from "react"
import axios from "axios"
import { useAuth } from "../storage/localstorage.jsx"
//import { sample } from "./sample.jsx"
import dots from "../icons/dots.png"
import { useOutletContext } from "react-router-dom"
import loadinggif from "../icons/loadinggif.gif"

function VideoPlayer(props) {

    const [video, setvideo] = useState()
    const [comment, setcomment] = useState("")
    const [datavideos, setdatavideos] = useState([])
    //const [dotsclicked,setdotsclicked] = useState(false)
    const [_, __, sidebartwodisplay,width] = useOutletContext()
    const params = useParams()
    const [editenabled,seteditenabled] = useState(false)

    const [channel, setchannel] = useState({})

    const [likes,setlikes] = useState(0)

    const [commentedit, setcommentedit] = useState("")

    const [likedvideo, setlikedvideo] = useState(false)
    const [dislikedvideo, setdislikedvideo] = useState(false)

    const [dislikes,setdislikes] = useState(0)
    const [loading,setloading] = useState(true)

    const { user } = useAuth()

    //console.log(user)

    //console.log(video)

    const commentsubmit = async() => {
        try {
            if (!user) {
                alert("Login to add comment")
                return 
            }

            if (comment.trim() == "" || comment.length==0) {
                alert("Enter Comment To add")
                return
            }

            axios.put("http://localhost:3000/api/comment",
                { comment: comment, videoid: params.id },
                { headers: { Authorization: `Bearer ${user.token}` } }).then(resp=>console.log(resp))
            
            alert("Comment Added Successfully")
            window.location.reload()
        }
        catch (err) {
            console.log("Error Submitting Comment",err)
        }
    }

    const commentdelete = async(commentid) => {
        try {
            axios.put("http://localhost:3000/api/commentdelete",
                { commentid: commentid, videoid: video?._id },
                { headers: { Authorization: `Bearer ${user.token}` } }).then(resp => console.log(resp))

            alert("Comment Deleted Successfully")
            window.location.reload()
        }

        catch (err) {
            console.log("Error deleting Comment", err)
        }


    }
    console.log(likes)
    console.log(dislikes)
    const likevideo = async () => {

        try {
            if (!user) {
                alert("Please login to like video")
                return
            }

            if (likedvideo) {
                await axios.patch(`http://localhost:3000/api/unlikevideo`,
                    { videoid: video?._id },
                    { headers: { Authorization: `Bearer ${user.token}` } }).then(resp => {
                        console.log(resp)
                        setlikes(resp.data.likes)
                        setdislikes(resp.data.dislikes)
                    })

                setlikedvideo(false)
/*                window.location.reload()*/

            }
            else {
                await axios.patch(`http://localhost:3000/api/likevideo`,
                    { videoid: video?._id },
                    { headers: { Authorization: `Bearer ${user.token}` } }).then(resp => {
                        console.log(resp)
                        setlikes(resp.data.likes)
                        setdislikes(resp.data.dislikes)
                    })

                setlikedvideo(true)
                setdislikedvideo(false)
                //window.location.reload()

            }
        }
        catch (err) {
            console.log("Cannot process request",err)
        }

    }

    const dislikevideo = async () => {

        try {
            if (!user) {
                alert("Please login to Dislike video")
                return
            }

            if (dislikedvideo) {
                await axios.patch(`http://localhost:3000/api/undislikevideo`,
                    { videoid: video?._id },
                    { headers: { Authorization: `Bearer ${user.token}` } }).then(resp => {
                        console.log(resp)
                        
                        setlikes(resp.data.likes)
                        setdislikes(resp.data.dislikes)
                    })
                setdislikedvideo(false)

            }
            else {
                await axios.patch(`http://localhost:3000/api/dislikevideo`,
                    { videoid: video?._id },
                    { headers: { Authorization: `Bearer ${user.token}` } }).then(resp => {
                        console.log(resp)
                        setlikes(resp.data.likes)
                        setdislikes(resp.data.dislikes)
                        
                    })

                setdislikedvideo(true)
                setlikedvideo(false)
                //window.location.reload()

            }
        }
        catch (err) {
            console.log("Cannot process request", err)
        }

    }

    console.log(likes)

    console.log(video)

    const EditComment =  async(commentid) => {
        try {
            if (commentedit.trim() == "" || commentedit.length == 0) {
                alert("Enter Comment to change")
                return 
            }

            axios.patch("http://localhost:3000/api/commentedit",
                { newcomment: commentedit, videoid: video?._id, commentid: commentid },
                { headers: { Authorization: `Bearer ${user.token}` } }).then(resp => console.log(resp))

            alert("Comment Edited Successfully")
            window.location.reload()
        }

        catch (err) {
            console.log("Error Editing Comment", err)
        }
    }

    //console.log(commentedit)

  
    useEffect(() => {

        const allvideos = async () => {
            try {
                const resp = await axios.get(`http://localhost:3000/api/video/${params.id}`)
                /*console.log(resp)*/
                if (resp.status === 200) {
                    setvideo(resp.data)
                    setlikes(resp.data.likes)
                    setdislikes(resp.data.dislikes)
                }
                else {
                    return null
                }
                
            }
            catch (err) {
                console.log("error fetching all videos,", err)
            }
            finally{
                setloading(false)
            }
        }

        const getdatavideos = async () => {
            try {
                await axios.get("http://localhost:3000/api/videos").then(resp => setdatavideos(resp.data))
            }
            catch (err) {
                console.log("Error Fetching videos", err)
            }
        }

        const getchannel = async () => {
            try {
                await axios.get(`http://localhost:3000/api/getchannel/${video.channelid}`).then(resp => setchannel(resp.data))

            }
            catch (err) {
                console.log("Error getting channel",err)
            }
        }

        allvideos()
        getdatavideos()

        getchannel()


        

    }, [video?.channelid,video?.likes,video?.dislikes])

    console.log(video)

    const videodata = props.data

    const concatvideos = datavideos.concat(videodata)

    //console.log(videodata)

    const videos = videodata.find((item) => item._id === params.id)

    //console.log(videos)

    //console.log(channel)

    //const { title } = videos

    //console.log(title)

    //const { uploader, views, title, _id, description, uploadDate, comments } = videos

    //var arr = []
    //for (var i = 0, t = videodata.length; i < t; i++) {
    //    arr.push(Math.round(Math.random() * t))
    //}
    //console.log(arr)
//    width = { width< 1100?(width < 840 ? `${width - 100
//    //} ` : `${ width - 280 }`) : "800"} height={width < 1100 ? "400" : (width < 840 ? "200" : (width < 740 ? "100" : "500"))}
//    width = { width< 1100?(width < 840 ? `${width - 100
    //} ` : `${ width - 280 }`) : "800"} height="500"

    //style={{ marginLeft: sidebartwodisplay && "100px" }}

    return (
        <div className="videopage" style={{ marginLeft: (sidebartwodisplay || width < 840) ? "80px" : "250px" }}>
            {loading && <img src={loadinggif} className="loadinggif" alt="loading"></img>}
            {video && (<><div className="video-player">
                <div>
                    <video width={(width > 840 && width < 1525) ? (width - 280) : "800"} height={(width > 840 && width < 1525) && "350" } controls >
                        <source src="../icons/video.mp4" type="video/mp4"/>
                    </video>
                </div>
                <div className="titlediv">
                    <p>{video.title}</p>
                </div>
                <div className="videosubsection" style={{ width: (width > 840 && width < 1525) && (width - 280) }}>
                    <div>
                        <div>
                            <img src={channel.profilepicture} alt="hello"></img>
                        </div>
                        <div>
                            <p>{channel.channelname}</p>
                            <p>No of subs:{channel.subscribers}</p>
                        </div>
                        <div>
                            <p>Subscribe</p>
                        </div>
                    </div>
                    <div>
                        <div onClick={likevideo}>
                            <img src={like} />
                            <p>{likes}</p>
                        </div>
                        <div onClick={dislikevideo}>
                            <img src={dislike} />
                            <p>{dislikes}</p>
                        </div>
                        <div>
                            <img src={share} />
                            <p>Share</p>
                        </div>
                        <div>
                            <img src={downloadicon} />
                            <p>Save</p>
                        </div>
                    </div>
                </div>
                <div className="description" style={{ width: (width > 840 && width < 1525) && (width-280) }}>
                    <div>
                        <h4>{video.views} views</h4>
                        <h4>{video.uploadDate.slice(0,33)}</h4>
                    </div>
                    <div>
                        <p>{video.description}</p>
                    </div>

                </div>
                <div className="comments">
                    <div>
                        <p>{video.comments.length} Comments</p>
                        <input placeholder="Enter Comment here" id="comment" onChange={(e) => setcomment(e.target.value)} maxLength="256" style={{ width: (width > 840 && width < 1525) && (width - 280) }}></input>
                        <button onClick={commentsubmit}>Submit</button>
                    </div>
                    <div className="usercomment">
                        {video.comments.map((item,index) => {
                            return (
                                <div className="comment" key={index} style={{ width: (width > 840 && width < 1525) && (width-280) }} >
                                    <div>
                                        <p>{item.name}</p>
                                        <img src={item.banner} style={{ height: "50px", width: "50px", borderRadius:"50%" }} />
                                        {/*<p>{Date(item.timestamp).toString().slice(3, 15)}</p>*/}
                                    </div>
                                    <div className="commenteditsection">
                                        <p>{item.comment}</p>
                                        {(user?._id == item.userid) && (
                                            <div style={{ display: editenabled ? "initial" : "none", marginBottom:"10px" }}>
                                                <input  type="text" name="comment" placeholder="enter new comment" style={{ height: "30px", width: "290px" }} onChange={(e) => setcommentedit(e.target.value)} />
                                            </div>
                                        )}
                                        <img src={dots} alt="hello" style={{ height: "20px", width: "20px", cursor: "pointer", }} />
                                    </div>
                                    {(user?._id == item.userid) && (<div>
                                        <button onClick={() => seteditenabled(!editenabled)} style={{ display: editenabled ? "none" : "initial" }}>Edit</button>
                                        <button onClick={() => commentdelete(item._id)} style={{ display: editenabled ? "none" : "initial" }}>Delete</button>
                                        <button style={{ display: editenabled ? "initial" : "none" }} onClick={() => {
                                            EditComment(item._id)
                                            seteditenabled(!editenabled)
                                            
                                        }}>Save</button>
                                        <button style={{ display: editenabled ? "initial" : "none" }} onClick={() => seteditenabled(!editenabled)}>Cancel</button>
                                    </div>)}
                                    
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="recomsection">
                {concatvideos.map((item, index) => {
                    if (item._id == video._id) {
                        return null
                    }
                    else {
                        return (
                            <Recommendation key={index} data={item} />
                        )
                    }
                })}
            </div>
            </>)}

            {videos && (<><div className="video-player">
                <div>
                    <video width={(width > 840 && width < 1525) ? (width - 280) : "800"} height={(width > 840 && width < 1525) && "350"} controls >
                        <source src="../icons/video.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className="titlediv">
                    <p>{videos.title}</p>
                </div>
                <div className="videosubsection" style={{ width: (width > 840 && width < 1525) && (width - 280) }}>
                    <div>
                        <div>
                            <img src={photo} alt="hello"></img>
                        </div>
                        <div>
                            <p>{videos.uploader}</p>
                            <p>No of subs</p>
                        </div>
                        <div>
                            <p>Subscribe</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={like} />
                            <p>10</p>
                        </div>
                        <div>
                            <img src={dislike} />
                            <p>10</p>
                        </div>
                        <div>
                            <img src={share} />
                            <p>Share</p>
                        </div>
                        <div>
                            <img src={downloadicon} />
                            <p>Save</p>
                        </div>
                    </div>

                </div>
                <div className="description" style={{ width: (width > 840 && width < 1525) && (width - 280) }}>
                    <div>
                        <h4>{videos.views} views</h4>
                        <h4>{videos.uploadDate}</h4>
                    </div>
                    <div>
                        <p>{videos.description}</p>
                    </div>

                </div>
                <div className="comments">
                    <div>
                        <h1>{videos.comments.length} Comments</h1>
                        <input placeholder="Enter Comment" id="comment" style={{ width: (width > 840 && width < 1525) && (width - 280) }}></input>
                        <button>Submit</button>
                    </div>
                    <div className="usercomment">
                        {videos.comments.map((item,index) => {
                            return (
                                <div className="comment" key={index} style={{ width: (width > 840 && width < 1525) && (width - 280) }}>
                                    <div>
                                        <p>{item.userId}</p>
                                        <p>{Date(item.timestamp).toString().slice(3, 15)}</p>
                                    </div>
                                    <div className="commenteditsection">
                                        <p>{item.text}</p>
                                        <img src={dots} alt="hello" style={{ height: "20px", width: "20px", cursor: "pointer"}} />
                                    </div>
                                    <div>
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="recomsection">
                {concatvideos.map((item, index) => {
                    if (item._id == videos._id) {
                        return null
                    }
                    else {
                        return (
                            <Recommendation key={index} data={item} />
                        )
                    }
                })}
            </div>
            </>

            )}
            
            

        </div>
    )
}

export default VideoPlayer