// JavaScript source code
//import thumbnail from "../icons/youtube.png"
import { Link, NavLink } from "react-router-dom"
import {useState,useEffect } from "react"
import axios from "axios"
function VideoCard(props) {

    const [channel, setchannel] = useState({})

    const { uploader, thumbnail, views, title, _id,sample } = props.data


    //this hook is used to get the channelname of each video .
    //this renders everytime when the component is loaded
    useEffect(() => {
        const getchannel = async() => {
            if (!sample) {

                try {
                    axios.get(`http://localhost:3000/api/channelbyowner/${uploader}`).then(resp => setchannel(resp.data))
                }
                catch (err) {
                    console.log("Error Fetching channel",err)
                }
            }

        }

        getchannel()


    }, [])

    //console.log(channel)

    //this component will be rendered in the homepage and each video you see on the homepage
    // will be rendered by this component.this includes video thumbnail,title,channelname,views

    return (
        <NavLink to={`/video/${_id}`} target="_blank" style={{textDecoration:"none"}}>
            <div className="video">
                <div>
                    <img src={thumbnail} alt="dwaawd"/>
                </div>
                <div>
                    <p>{title}</p>
                    <p>{channel?.channelname ? channel?.channelname : uploader}</p>
                    <p>{`${views} views`}</p> 
                </div>
                {/*{uploadDate.slice(1, 28)}*/}
            </div>
        </NavLink>
    )
}

export default VideoCard;