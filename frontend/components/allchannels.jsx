// JavaScript source code
import axios from "axios"
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useOutletContext } from "react-router-dom"
import { useAuth } from "../storage/localstorage.jsx"
import loadinggif from "../icons/loadinggif.gif"
function Channels() {

    //this components describes all the channels that are created
    // all the channels will be displayed with thier name and channel information

    const [channels, setchannels] = useState([])
    const [loading,setloading] = useState(true)
    const { user } = useAuth()

    const [_, __, sidebartwodisplay] = useOutletContext()

    // this component displays all the channel that are created by the users.


    // useeffect hook to fetch all the channels in the database
    // axios is used for api calling 
    useEffect(() => {

        //this useeffect hook retrieves all the channels that are in the database and
        // store them in channels state variable.


        const getchannels = async () => {

            //this function retrieves all the channels that are present in the database with thier respective channel information
            try {
                axios.get("http://localhost:3000/api/channels").then(resp => setchannels(resp.data))
                    .catch(err => console.log("Error Retreiving channels", err))
            }

            //this statement handles the error when the api call fails .

            catch (err) {
                console.log("Cannot Get Channels", err)

            }
            finally {

                //after the channels are loaded perfectly then the loading will be set to false and
                //loading icon will not be displayed.


                setloading(false)
            }
        }

        getchannels()
       
    }, [])


    console.log(channels)

    console.log(channels.map(item=>console.log(item.channelname)))

    return (
            //this returns all the channel information with thier respective name,banner,description and subscribers
            <div className="allchannels" style={{ marginLeft: sidebartwodisplay && "100px" }}>
            {loading && <img src={loadinggif} className="loadinggif" alt="loading"></img>}
            {channels.map(channel => {
                return (
                    <div key={channel._id}>
                        <img src={channel.banner} />
                        <p>{channel.channelname}</p>
                        <p>{channel.description.length > 30 ? (channel.description.slice(1,20).concat("...")) : channel.description}</p>
                        <p>Subs:{channel.subscribers}</p>
                        <NavLink to={(user?.channelId == channel._id) ? "/channel" : `/channels/${channel.channelname}`}><button>Go to Channel</button></NavLink>
                    </div>
                )
            }) }
           
            </div>
        
    )

}

export default Channels
