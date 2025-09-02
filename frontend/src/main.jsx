import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from "../storage/localstorage.jsx"

createRoot(document.getElementById('root')).render(
    //auth provided stores the basic login information to local session storage such as username,email,token etc
    
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
    
)
