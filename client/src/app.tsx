import React, { useContext } from "react";
import GlobalStyle from "./styles/global";
import HomePage from "./pages/home";
import { UserContext } from "./context/user-context";
import LoginPage from "./pages/login-page";

const App = () => {
    
    const {userObj} = useContext(UserContext)

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