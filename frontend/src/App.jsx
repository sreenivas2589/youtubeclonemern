import './App.css'
import Homepage from "../components/homepage.jsx"
//import { createContext } from "react"
import { sample } from "../components/sample.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense } from "react"
/*import loadingicon from "../icons/loading-bar.png"*/
import LoginAndRegister from "../components/loginpage.jsx"
import Video from "../components/video.jsx"
import VideoPlayer from "../components/videoplayer.jsx"
import Notfound from "../components/notfound.jsx"
import Channel from "../components/channel.jsx"
import Register from "../components/register.jsx"
import Upload from "../components/upload.jsx"
import Channels from "../components/allchannels.jsx"
import axios from "axios"
import { useState, useEffect } from "react"
import loading from "../icons/loading.png"
import ChannelInfo from "../components/channelinfo.jsx"
import { AuthProvider } from "../storage/localstorage.jsx"

function App() {

  //const Usercontext = createContext(sample)
    const [videos, setvideos] = useState([])

    // fetch all the videos from the databases as soon as the page is rendered. 

    useEffect(() => {

        const allvideos = async () => {
            try {

                //using axios to make a GET api call to fetch all the videos from mongodb database
                // and set the fetched videos and set them to "videos" state variable.
                const resp = await axios.get("http://localhost:3000/api/videos")
                setvideos(resp.data)
            }

            //if there is an error , catch statement executes the error 
            catch (err) {
                console.log("error fetching all videos,",err)
            }
        }

        allvideos()
    },[])

    //console.log(videos)

    // i've implemented lazy loading to all the components so that all the components are not loaded at the beginning.
    // only the components that are called will be rendered.

    return (
          <BrowserRouter>
              <Routes>
                <Route path="/" element={
                    <Suspense fallback={<div className="loading"><img src={loading}></img></div>}>
                        <Homepage data={sample} />
                    </Suspense>} >
                        <Route index element={
                            <Suspense fallback={<div className="loading"><img src={loading}></img></div>}>
                                <Video data={sample} />
                            </Suspense> } />
                        <Route path="video/:id" element={
                            <Suspense fallback={<div className="loading"><img src={loading}></img></div>}>
                                <VideoPlayer data={sample} />
                            </Suspense> } />
                        <Route path="channel" element={
                            <Suspense fallback={<div className="loading"><img src={loading}></img></div>}>
                                <Channel data={videos} />
                            </Suspense> } />
                        <Route path="upload" element={
                            <Suspense fallback={<div className="loading"><img src={loading}></img></div>}>
                                <Upload />
                            </Suspense>} />

                        <Route path="allchannels" element={
                            <Suspense fallback={<div className="loading"><img src={loading}></img></div>}>
                                <Channels />
                            </Suspense>} />

                        <Route path="register" element={
                            <Suspense fallback={<div className="loading"><img src={loading}></img></div>}>
                                <Register />
                        </Suspense>} />
                        <Route path="channels/:channelname" element={
                            <Suspense fallback={<div className="loading"><img src={loading}></img></div>}>
                                <ChannelInfo />
                        </Suspense>} />
                        <Route path="login" element={
                            <Suspense fallback={<div className="loading"><img src={loading}></img></div>}>
                                <LoginAndRegister />
                            </Suspense>} />
                </Route>  
                        <Route path="*" element={
                            <Suspense fallback={<div className="loading"><img src={loading}></img></div>}>
                                <Notfound />
                            </Suspense>} />
              </Routes>
          </BrowserRouter>
  )
}




export default App
