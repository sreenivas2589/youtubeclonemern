// JavaScript source code
// JavaScript source code
import { useEffect, useState } from "react"
import axios from "axios"
import {  useOutletContext } from "react-router-dom"
import ChannelVideoDisplay from "../components/channelvideodisplay.jsx"
import { useParams } from "react-router-dom"
import close from "../icons/close.png"
function ChannelInfo() {
    const params = useParams()
    const channelname = params.channelname

    const [channel, setchannel] = useState({})
    const [videos, setvideos] = useState([])
    //const [newchannelname, setnewchannelname] = useState("")
    //const [newchanneldescription, setnewchanneldescription] = useState("")
    //const [newchannelprofilepic, setnewchannelprofilepic] = useState("")
    //const [newchannelbanner, setnewchannelbanner] = useState("")


    const [_, __, sidebartwodisplay, width] = useOutletContext()
    const [viewdescription, setviewdescription] = useState(false)

    useEffect(() => {

        const getchanneldetails = async() => {
            try {

                axios.get(`http://localhost:3000/api/channelname/${channelname}`).then(resp => {
                    setchannel(resp.data)
                    setvideos(resp.data.videos)
                })
            }
            catch (err) {
                console.log("Cannot Get Channel",err)
            }
        }

        getchanneldetails()

    }, [])

    console.log(channel)
    console.log(videos)

    console.log(width)


    //this component returns details of each and every channel in the database in a grid style.
    //we can also view details of each channel by clicking "view channel" button

    return (
        <div className="channel" style={{ marginLeft: sidebartwodisplay && "100px" }}>
            <img src={channel.banner} alt="hello" className="banner" style={
                { width: width > 840 ? `${width - 320}px` : `${width - 120}px` }
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
                    {/*<p style={{ fontWeight: "500" }}>Owner:{channel.username}</p>*/}

                </div>
            </div>
            <div className="channelvideoupload">
                <button >Upload Video</button>
                <button >Customize Channel</button>
                <button onClick={() => setviewdescription(!viewdescription)}>Description</button>
            </div>
            <div className={viewdescription ? "viewdescriptionshow" : "viewdescription"}>
                <div className="viewdescriptiondiv">
                    <p>{channel?.description}</p>
                    <div style={{ position: "absolute", top: "0", right: "0", cursor: "pointer" }} onClick={() => setviewdescription(!viewdescription)}>
                        <img src={close} style={{ height: "60px", width: "60px" }}></img>
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
                        <ChannelVideoDisplay id={id} key={index} />
                    )
                })}
            </div>

        </div>
    )

}

export default ChannelInfo