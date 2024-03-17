import React, { useEffect, useContext } from "react";
import GlobalStyle from "./styles/global";
import HomePage from "./pages/home";
import { gapi } from "gapi-script";
import { UserContext } from "./context/user.context";
import { LoginPage } from "./pages/login-page";

const App = () => {
    
    const {userObj, setNewUserInfo, clientId} = useContext(UserContext)
    
    console.log('User Info:: ', userObj)

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };
        gapi.load('client:auth2', start);
    })

    const loginWithServer = async() => {
        if (userObj.userInfo.googleId) { 
            const response = await fetch('/api/login', {
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
            const result = await response.json()
            setNewUserInfo({...userObj.userInfo, listokUserId: result[0].user_id}, true)
        } else {
            return
        }
    }

    useEffect(() => {
        loginWithServer();
    }, [userObj.userInfo.googleId])

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