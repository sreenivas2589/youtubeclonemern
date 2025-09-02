// JavaScript source code
import wallpaper from "../icons/wallpaper.jfif"
import notfound from "../icons/error.png"
import {NavLink} from "react-router-dom"

//this component returns the "Not found" page which appears when user visit undefined route.
function Notfound() {
    return (
        <div className="notfound" style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: "cover" }} >
            <div>
                <div>
                    <img src={notfound} alt="hello" />
                </div>
                <div>
                    <p>Page Not Found</p>
                    <p>We're sorry, we couldn't find the page you requested.</p>
                </div>
            </div>
            <div/>
            <div>
                < NavLink to="/" ><button className="gotohome">Go To HomePage</button></NavLink >
            </div>
                
        </div>
               
    ) 

}

export default Notfound