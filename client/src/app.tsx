import React, { useEffect, useContext } from "react";
import GlobalStyle from "./styles/global";
import HomePage from "./pages/home";
import { gapi } from "gapi-script";
import { UserContext } from "./context/user.context";
import { LoginPage } from "./pages/login-page";
import styled from "styled-components";

const AppContainer = styled.div`
    width: 100%;
`

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

    return (
        <AppContainer>
            <GlobalStyle />
            { userObj.loggedIn ?
            <HomePage /> :
            <LoginPage />
            }
           
        </AppContainer>
    )
}

export default App