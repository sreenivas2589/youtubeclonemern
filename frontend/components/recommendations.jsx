// JavaScript source code
import { Link, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"

function Recommendation(props) {

    const [channel, setchannel] = useState({})

    const { name, uploader, thumbnail, views, title, _id, sample } = props.data

    //this component renders all the recommendations we get in the video page at the side .

    //this includes all the videos present in the database .

    useEffect(() => {
        const getchannel = async () => {
            if (!sample) {

                try {
                    axios.get(`http://localhost:3000/api/channelbyowner/${uploader}`).then(resp => setchannel(resp.data))
                }
                catch (err) {
                    console.log("Error Fetching channel", err)
                }
            }

        }

        getchannel()


    }, [])

    //this component returns list of grid with each grid containing features such as thumbnail,title,name,channelname,views.
    //all the recommended videos we see on the side of the videoplayer page are rendered by this component.

    return (
        <NavLink to={`/video/${_id}`} target="_blank" style={{ textDecoration: "none" }}>
            <div className="recommendation">
            
                <div>
                    <img src={thumbnail} alt="dwaawd" />
                </div>
                <div>
                    <p>{title}</p>
                    <p>{name}</p>
                    <p>{channel?.channelname ? channel?.channelname : uploader}</p>
                    <p>Views:{views}</p>
                </div>
            
            </div>
        </NavLink >
    )
}

export default Recommendation;