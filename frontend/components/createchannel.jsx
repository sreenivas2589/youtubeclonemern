// JavaScript source code
import { useAuth } from "../storage/localstorage.jsx"
import { useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
function CreateChannel() {

    const [channelname, setchannelname] = useState("")
    const [channeldesc, setchanneldesc] = useState("")
    const [channelbanner, setchannelbanner] = useState("")
    const [channelprofilepicture,setchannelprofilepicture] = useState("")

    //const [channel, setchannel] = useState(null)
    const { user, setUser } = useAuth()

    //console.log(JSON.parse(localStorage.getItem("user")))

    const handlechannel = async (e) => {
        //if (!user) {
        //    console.log("YOu Should login to create a channel")
        //    return
        //}
        e.preventDefault()

        if (!channelname || !channeldesc || !channelbanner || !channelprofilepicture) {
            alert("Enter All Fields to create channel")
            return
        }

        try {
            axios.post("http://localhost:3000/api/channel",
                {channelname: channelname.trim(), banner: channelbanner.trim(), description: channeldesc.trim(), profilepicture: channelprofilepicture.trim() },
                { headers: { Authorization: `Bearer ${user.token}` } }
            ).then(res => {
                console.log(res.data)
                setUser({ ...user, channelId: res.data.channelId || res.data._id })

            })

            alert("Channel Created")

        }
        catch (err) {
            console.log(err)
        }
    }

    console.log(user)

    //this component creates the channel with all the necessary information.
    //this only works when the user is logged in or user does not have any channel
    //if the user have any channel then this component displays that particular channel.

    return (
        (!user ? (
            <div className="loginchannelprompt">
                <p>login to create a channel</p>
                <NavLink to="/login"><button>Login</button></NavLink>
            </div>
            ) :
        (<div className="createchannel">
            <p>Create Channel</p>
                <div>
                    <input placeholder="Enter Channel name" onChange={(e) => setchannelname(e.target.value)} maxLength="30" />
                    <input placeholder="enter Channel Description" onChange={(e) => setchanneldesc(e.target.value)} maxLength="556" />
                    <input placeholder="enter channel banner url" onChange={(e) => setchannelbanner(e.target.value)} />
                    <input placeholder="enter channel Picture url" onChange={(e) => setchannelprofilepicture(e.target.value)} />
                    <button onClick={handlechannel}>Submit</button>
            </div>
            
        </div>))
        
    )
}

export default CreateChannel