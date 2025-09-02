import { createContext, useContext, useEffect, useState } from "react";

// Create context
const AuthContext = createContext();

//creating context to passdown the required information from parent to child components.

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    //children defines all the children components that uses this information
    // use effect hook ensures that if the user is logged in then it will fetch all the required login information and
    // stores them in "user" state varible so that the user will be kept logged for 10hours("Token expiry limit")

    useEffect(() => {

        //if user already logged in,then below function retrieves the info and parse the info so that it can be stored in the "user" state variable.

        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            const parsed = JSON.parse(storedUser)
            
            if (parsed.channel && !parsed.channelId) {
                parsed.channelId = (typeof parsed.channel === "object" && parsed.channel?._id)
                    ? parsed.channel._id
                    : parsed.channel
                delete parsed.channel
            }
            setUser(parsed)
        }
    }, [])

   
    useEffect(() => {
        // if the user exist already then set the local storage to user after stringifying it/
        //

        if (user) {

            const toStore = { ...user }
            if (toStore.channel) {
                toStore.channelId = (typeof toStore.channel === "object" && toStore.channel?._id)
                    ? toStore.channel._id
                    : toStore.channel
                delete toStore.channel
            }
            localStorage.setItem("user", JSON.stringify(toStore));
        } else {
            localStorage.removeItem("user")
        }
    }, [user])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}