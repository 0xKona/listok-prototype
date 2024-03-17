import React, { useCallback, useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { UserContext } from '../context/user.context';

export const LogoutButton = () => {
    
    const {setNewUserInfo, clientId} = useContext(UserContext);

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