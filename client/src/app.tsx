import React, { useEffect, useContext } from "react";
import GlobalStyle from "./styles/global";
import HomePage from "./pages/home";
import { gapi } from "gapi-script";
import { UserContext } from "./context/user.context";
import { LoginPage } from "./pages/login-page";

const App = () => {
    
    const clientId = "487824460304-7enq26pcdfqpfe6r3rbpv034o9inoptt.apps.googleusercontent.com" //client id here, TODO: Change to import from .env
    const {userObj} = useContext(UserContext)
    
    console.log('User Info: ', userObj)
    
    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };
        gapi.load('client:auth2', start);
    })

    const addUser = async() => {
        if (userObj.userInfo.googleId) { 
            const response = await fetch('/api/insertUserTest', {
                method: 'POST',
                body: JSON.stringify({
                    userId: userObj.userInfo.googleId,
                    userEmail: userObj.userInfo.email,
                    userDisplayName: userObj.userInfo.name
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log('Api Triggered: ', response)
        } else {
            return
        }
    }

    useEffect(() => {
        addUser()
    }, [userObj.userInfo])

    return (
        <>
            <GlobalStyle />
            { userObj.loggedIn ?
            <HomePage /> :
            <LoginPage />
            }
           
        </>
    )
}

export default App