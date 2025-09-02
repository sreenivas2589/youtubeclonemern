// JavaScript source code
//import axios from "axios"
//import {useState} from "react"
//import { useSelector } from "react-redux"
import ChannelDetails from "../components/channeldetails.jsx"
import CreateChannel from "../components/createchannel.jsx"
import { useAuth } from "../storage/localstorage.jsx"
import { useOutletContext } from "react-router-dom"

function Channel(props) {
    //const userstate = useSelector((state) => state.user)

    const videos = props.data

    console.log(videos)

    const { user } = useAuth()

    const [_, __, sidebartwodisplay] = useOutletContext()

    //this component return the channel details if the user have any channel.
    // if the user does not have any channel then it will redirect to "createchannel" page

    return (
        <div className="channel" style={{ marginLeft: sidebartwodisplay && "100px" }}>
            {user?.channelId ? (<ChannelDetails />) :
                (<CreateChannel />)
            }
        </div>
    )
}

export default Channel