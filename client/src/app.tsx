import React, { useEffect, useContext } from "react";
import GlobalStyle from "./styles/global";
import HomePage from "./pages/home";
import { gapi } from "gapi-script";
import { UserContext } from "./context/user.context";
import { LoginPage } from "./pages/login-page";

const App = () => {
    
    const {userObj, clientId} = useContext(UserContext)
    
    console.log('User Info:: ', userObj)

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: clientId,
                scope: "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid"
            })
        };
        gapi.load('client:auth2', start);
    })

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