import React, { useCallback, useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { UserContext } from '../context/user.context';

const clientId = "487824460304-7enq26pcdfqpfe6r3rbpv034o9inoptt.apps.googleusercontent.com" //client id here TODO: Change to import from .env

export const LogoutButton = () => {
    
    const {setNewUserInfo} = useContext(UserContext);

    const onSuccess = () => {
        console.log("Logged out successfully");
        setNewUserInfo({}, false)
    }

    return (
        <div id="signOutButton">
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout'
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}