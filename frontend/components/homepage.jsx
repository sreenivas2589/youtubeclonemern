// JavaScript source code
import icon from "../icons/youtubefull.png"
import searchicon from "../icons/search.png"
import mic from "../icons/mic.png"
import menu from "../icons/menu.png"
import login from "../icons/user-profile.png"


import home from "../icons/sidebar/home.png"
import shorts from "../icons/sidebar/short-video.png"
import subscribe from "../icons/sidebar/subscribe.png"
import music from "../icons/sidebar/music.png"
import history from "../icons/sidebar/history.png"
import playlist from "../icons/sidebar/playlist.png"
import videos from "../icons/sidebar/videos.png"
import watchlater from "../icons/sidebar/clock.png"
import liked from "../icons/sidebar/likedvideos.png"
import downloads from "../icons/sidebar/downloads.png"
import trending from "../icons/sidebar/trending.png"
import shopping from "../icons/sidebar/shopping.png"
import movies from "../icons/sidebar/movies.png"
import live from "../icons/sidebar/live.png"
import gaming from "../icons/sidebar/gaming.png"
import sports from "../icons/sidebar/sports.png"
import courses from "../icons/sidebar/courses.png"
import fashion from "../icons/sidebar/fashion.png"
import podcasts from "../icons/sidebar/podcast.png"
import settings from "../icons/sidebar/settings.png"
import report from "../icons/sidebar/reporthistory.png"
import help from "../icons/sidebar/help.png"
import feedback from "../icons/sidebar/feedback.png"

import VideoCard from "./videocard.jsx"
import { Outlet } from "react-router-dom"
import { useEffect, useState} from "react"
import { Link, NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"

import home2 from "../icons/secondsidebar/home.png"
import shortvideo from "../icons/secondsidebar/short-video.png"

//import { useDispatch, useSelector } from "react-redux"

import { useAuth } from "../storage/localstorage.jsx"
function Homepage() {
    const [sidebartwodisplay, setsidebartwodisplay] = useState(false)

    const navigate = useNavigate()
    //const userstate = useSelector((state) => state.user)

    const [extension, setextension] = useState(false)

    const { user } = useAuth()
    const [dupesearch,setdupesearch] = useState("")
    const [search, setsearch] = useState("")

    const [channel, setchannel] = useState({})

    const [width, setWidth] = useState(0)
    const [__, setHeight] = useState(0)

    const handleWindowResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    //const dispatch = useDispatch()
    const handlesearch = () => {
        navigate("/")
        setsearch(dupesearch)
    }

    console.log(width)

    //this function signs out the user 

    const signout = () => {

        localStorage.removeItem('user')
        window.location.reload()

    }

    //this hook gets the channel by the id of the user.
    //if the channel does not exist then it will throw an error.
    //this also incldes width and height properties of the document which are rerendered at every change
    //we use the width propery to make our elements of UI dynamic according to our needs.

    useEffect(() => {

        const getChannel = () => {

            if (user) {
                axios.get(`http://localhost:3000/api/channel/${user?._id}`, { headers: { Authorization: `Bearer ${user.token}` } })
                    .then(resp => setchannel(resp.data))
            }
        }

        getChannel()

        handleWindowResize()


        window.addEventListener('resize', handleWindowResize);

        return () => window.removeEventListener('resize', handleWindowResize)

    }, [user?._id,user?.channelId])

    //console.log(user)
    //console.log(channel)

    //console.log(dimensions.width)

    //console.log(user)
    //console.log(dupesearch)
    //console.log(userstate)

/*    console.log(sidebartwodisplay)*/


    //this component displays all the UI elements you see in the homepage.
    //if the videos are not uploaded then this component will only display dummy videos.
    //if the videos are uploaded then this will display all the uploaded videos along with dummy videos in place.

    //this also includes the sidebar,headers and all the required elements in the homepage
    return (
        <>
          <div className="homepage">
              <header className="headermenu">
                  <div>
                      <button onClick={() => setsidebartwodisplay(!sidebartwodisplay)}><img src={menu} alt="hello" style={{ width: "20px", height: "20px" }}></img></button>
                      <Link to="/"><img src={icon} alt="hello"></img></Link>
                  </div>
                  <div className="middleheader">
                      <input type="text" placeholder="Search" onChange={(e) => setdupesearch(e.target.value)} value={dupesearch} className="searchbox" id="searchbox"></input>
                      <button onClick={handlesearch}><img src={searchicon}></img></button>
                      <button><img src={mic} style={{ marginLeft: "3px" }}></img></button>
                  </div>
                    <div onClick={() => setextension(!extension)} className="channelbutton" style={{ backgroundColor: extension ? "rgba(89, 146, 215,0.3)" : "white"}}>
                        {channel._id ? <img src={channel.profilepicture} style={{ borderRadius:"50%" }}></img> : <img src={login}></img>}
                        {user && <p className="headername">{user?.username}</p>}
                  </div>

                  <div className={extension ? "headerextension" : "headerextensionhidden"}>
                        <div className="channeldisplay">
                            {channel._id ? <NavLink to="channel"><img src={channel._id ? channel.profilepicture : login} alt="hello" /></NavLink> : <img src={login}></img>}
                            <p style={{ fontFamily: "Raleway", fontSize: "1.0rem", fontWeight:"500" }}>{channel._id ? channel.channelname : user?.userid}</p>
                            {channel._id ? <NavLink to="channel" style={{ textDecoration: "none" }}><p style={{ cursor: "pointer", color: "blue", fontSize: "1rem" }}>View Your Channel</p></NavLink> : ((user && !user.channelId) ? <NavLink to="channel" style={{ textDecoration: "none", color: "blue" }}><p style={{ fontSize: "1.2rem" }}>Create Channel</p></NavLink> : <NavLink to="login" style={{ textDecoration: "none", color: "blue" }}><p style={{ fontSize: "1.2rem" }}>login</p></NavLink>)}
                        </div>
                        <div>
                            <img src={settings} alt="hello" />
                            {user ? <NavLink to="channel" style={{ textDecoration: "none", color: "black" }} onClick={signout}><p>Sign Out</p></NavLink> : <NavLink to="register" style={{textDecoration:"none",color:"black"}}><p>Create Account</p></NavLink>}
                        </div>
                        <div>
                            <img src={settings} alt="hello" />
                            <NavLink to="/allchannels" style={{textDecoration:"none",color:"black"}}><p>View All Channels</p></NavLink>
                        </div>
                        <div>
                            <img src={settings} alt="hello" />
                            <p>Google Account</p>
                        </div>
                        <div>
                            <img src={settings} alt="hello" />
                            <p>Youtube Studio</p>
                        </div>
                        <div>
                            <img src={settings} alt="hello" />
                            <p>Your Premium Benefits</p>
                        </div>
                        <div>
                            <img src={settings} alt="hello" />
                            <p>Language:English</p>
                        </div>
                        <div>
                            <img src={settings} alt="hello" />
                            <p>Restricted Mode:off</p>
                        </div>
                        <div>
                            <img src={settings} alt="hello" />
                            <p>Location:India</p>
                        </div>
                        <div>
                            <img src={settings} alt="hello" />
                            <p>Keyboard Shortcuts</p>
                        </div>
                        <div>
                            <img src={settings} alt="hello" />
                            <p>Settings</p>
                        </div>
                  </div>

                </header>
                {/*this section incldes a second sidebar which appear when the three lines button is cliked*/}
                <div className="sidebartwo" style={{ display: sidebartwodisplay && "flex"}}>
                    <div onClick={()=>navigate("/") }>
                        <img src={home2} alt="hello"/>
                    </div>
                    <div>
                        <img src={shortvideo} alt="hello" />
                    </div>
                    <div>
                        <img src={subscribe} alt="hello" />
                    </div>
                    <div>
                        <img src={music} alt="hello" />
                    </div>
                    <NavLink to={channel._id ? "channel" : "login"}>
                    <div>
                        <img src={channel._id ? channel.profilepicture : login } alt="hello" />
                    </div>
                    </NavLink>

                    <div>
                        <img src={downloads} alt="hello" />
                    </div>
                </div>
                <div className={sidebartwodisplay ? "sidebarhidden" : "sidebar"}>
                  <div className="sidebarmain">
                      <div>
                          <h1>Home</h1>
                      </div>
                      <div className="sidebaricons">
                          <div>
                              <img src={home}></img>
                              <NavLink to="/" style={{ textDecoration:"none",color:"black" }}><h1>Home</h1></NavLink>
                          </div>
                          <div>
                              <img src={shorts}></img>
                              <h1>Shorts</h1>
                          </div>
                          <div>
                              <img src={subscribe}></img>
                              <h1>Subscriptions</h1>
                          </div>
                          <div>
                              <img src={music}></img>
                              <h1>Youtube Music</h1>
                          </div>

                      </div>
                  </div>
                  <div>
                      <div>
                          <h1>You</h1>
                      </div>
                      <div className="sidebaricons">
                          <div>
                              <img src={history}></img>
                              <h1>History</h1>
                          </div>
                          <div>
                              <img src={playlist}></img>
                              <h1>Playlists</h1>
                          </div>
                          <div>
                              <img src={videos}></img>
                              <h1>Your Videos</h1>
                          </div>
                          <div>
                              <img src={watchlater}></img>
                              <h1>Watch Later</h1>
                          </div>
                          <div>
                              <img src={liked}></img>
                              <h1>Liked</h1>
                          </div>
                          <div>
                              <img src={downloads}></img>
                              <h1>Downloads</h1>
                          </div>

                      </div>
                  </div>
                  <div className="sidebarmain">
                      <div>
                          <h1>Subscriptions</h1>
                      </div>
                      <div className="sidebaricons">
                          <div>
                              <img src={home}></img>
                              <h1>Home</h1>
                          </div>
                          <div>
                              <img src={home}></img>
                              <h1>Shorts</h1>
                          </div>
                          <div>
                              <img src={home}></img>
                              <h1>Subscriptions</h1>
                          </div>
                          <div>
                              <img src={home}></img>
                              <h1>Youtube Music</h1>
                          </div>

                      </div>
                  </div>
                  <div className="sidebarmain">
                      <div>
                          <h1>Explore</h1>
                      </div>
                      <div className="sidebaricons">
                          <div>
                              <img src={trending}></img>
                              <h1>Trending</h1>
                          </div>
                          <div>
                              <img src={shopping}></img>
                              <h1>Shopping</h1>
                          </div>
                          <div>
                              <img src={music}></img>
                              <h1>Music</h1>
                          </div>
                          <div>
                              <img src={movies}></img>
                              <h1>Movies</h1>
                          </div>
                          <div>
                              <img src={live}></img>
                              <h1>Live</h1>
                          </div>
                          <div>
                              <img src={gaming}></img>
                              <h1>Gaming</h1>
                          </div>
                          <div>
                              <img src={sports}></img>
                              <h1>Sports</h1>
                          </div>
                          <div>
                              <img src={courses}></img>
                              <h1>Courses</h1>
                          </div>
                          <div>
                              <img src={fashion}></img>
                              <h1>Fashion & Beauty</h1>
                          </div>
                          <div>
                              <img src={podcasts}></img>
                              <h1>Podcasts</h1>
                          </div>

                      </div>
                  </div>
                  <div className="sidebarmain">
                      <div>
                          <h1>More From Youtube</h1>
                      </div>
                      <div className="sidebaricons">
                          <div>
                              <img src={home}></img>
                              <h1>Youtube Studio</h1>
                          </div>
                          <div>
                              <img src={home}></img>
                              <h1>Youtube Music</h1>
                          </div>
                          <div>
                              <img src={home}></img>
                              <h1>Youtue Kids</h1>
                          </div>

                      </div>
                  </div>
                  <div className="sidebarmain">
                      <div>
                          <h1>Title</h1>
                      </div>
                      <div className="sidebaricons">
                          <div>
                              <img src={settings}></img>
                              <h1>Settings</h1>
                          </div>
                          <div>
                              <img src={report}></img>
                              <h1>Report History</h1>
                          </div>
                          <div>
                              <img src={help}></img>
                              <h1>Help</h1>
                          </div>
                          <div>
                              <img src={feedback}></img>
                              <h1>Send feedback</h1>
                          </div>

                      </div>
                  </div>
                  <div className="sidebarfooter">
                      <div>
                          <a href="#">About</a>
                          <a href="#">Press</a>
                          <a href="#">Copyright</a>
                          <a href="#">Contact us</a>
                          <a href="#">Creators</a>
                          <a href="#">Advertise</a>
                          <a href="#">Developers</a>
                      </div>
                      <div>
                          <a href="#">Terms</a>
                          <a href="#">Privacy</a>
                          <a href="#">Policy & Safety</a>
                          <a href="#">How youtube works</a>
                          <a href="#">Test new features</a>
                      </div>
                      <div>
                        <h3>Internshala Limited</h3>
                      </div>
                  </div>

              </div>
                <Outlet context={[search, setsearch, sidebartwodisplay, width]}/>
          </div>
          
        </>

  )
}

export default Homepage;

