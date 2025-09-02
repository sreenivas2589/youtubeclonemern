// JavaScript source code
import VideoCard from "./videocard"
import { sample } from "./sample.jsx"
import { useState,useEffect } from "react"
import { Outlet, useOutletContext } from "react-router-dom"
//import videonotfound from "../icons/no-video.png"
import axios from "axios"
import loadinggif from "../icons/loadinggif.gif"

function Video() {

    //this hook gets all the videos which are in the database.
    useEffect(() => {

        const getdatavideos = async () => {
            try {
                const resp = await axios.get("http://localhost:3000/api/videos")

                settotalvideos(resp.data.concat(sample))
            }
            catch (err) {
                console.log("Error Fetching videos", err)
            }
            finally {
                setloading(false)
            }
        }
        getdatavideos()

    }, [])

    const [search, ___, sidebartwodisplay] = useOutletContext()

    const [loading, setloading] = useState(true)

    const [totalvideos, settotalvideos] = useState([])

    const [cat,setcat] = useState([])
 
    let filteredvideos = totalvideos

    if (search.length > 0) {
        filteredvideos = totalvideos.filter(item => item.title.toLowerCase().includes(search.trim().toLowerCase()))
    }

    else {
        filteredvideos = totalvideos
    }

    function setcategory (text) {

        setcat(filteredvideos.filter(item => item.category.toLowerCase() === text.toLowerCase()))
    }

    console.log(cat)

    console.log(filteredvideos)

    return (
        <div className="videosection">
            <header className="videofilter">
                <button onClick={() => setcategory("all")}>All</button>
                <button onClick={() => setcategory("movies")} >Movies</button>
                <button onClick={() => setcategory("sports")} >Sports</button>
                <button onClick={() => setcategory("music")} >Music</button>
                <button onClick={() => setcategory("cricket")} >Cricket</button>
                <button onClick={() => setcategory("news")} >News</button>
                <button onClick={() => setcategory("tutorial")} >Tutorials</button>
        
            </header>
            <div className="videocarddiv" style={{ marginLeft: sidebartwodisplay && "80px"}}>
                {loading && <img src={loadinggif} className="loadinggif" alt="loading"></img>}
                {cat.length > 0 ? cat.map((item, index) => {
                    return (
                        <VideoCard key={index} data={item} />
                    )
                }) : (filteredvideos.map((item, index) => {
                    return (
                        <VideoCard key={index} data={item} />
                    )
                })

                )}
            </div>
        </div>
    )
}

export default Video