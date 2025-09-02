// JavaScript source code
// JavaScript source code
import { useState, useEffect } from "react"
import axios from "axios"
//import { useNavigate } from "react-router-dom"
import { NavLink } from "react-router-dom"

import loadinggif from "../icons/loadinggif.gif"

function ChannelVideoDisplay(props) {

    const [loading, setloading] = useState(true)
    
    //const [closecliked,setclosecliked] = useState(false)

    const id = props.id

    //const navigate = useNavigate()

    const [video, setvideo] = useState({})

    console.log(id)
    console.log(video)

    //this hook display all the videos of that particular channel in "channel" page

    useEffect(() => {

        const getvideobyid = async () => {
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


    //this component displays all the video information related to that particular channel such as,
    //video name and total views.
    //this component will be rendered in "channels" link where all the channels are displayed.

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
                    </div>
                </div>

            </div>

        </>

    )
}


export default ChannelVideoDisplay