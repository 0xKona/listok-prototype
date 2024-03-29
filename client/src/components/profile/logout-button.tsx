import React, { useCallback, useContext } from 'react';
import { GoogleLogout } from 'react-google-login';
import { UserContext } from '../../context/user-context';
import styled from 'styled-components';

const SignOutBtnWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const LogoutButton = () => {
    
    const {setNewUserInfo, clientId} = useContext(UserContext);

    const onSuccess = () => {
        console.log("Logged out successfully");
        setNewUserInfo({}, false)
    }

    return (
        <SignOutBtnWrapper>
            <GoogleLogout
                clientId={clientId}
                buttonText='Logout of Google'
                onLogoutSuccess={onSuccess}
            />
        </SignOutBtnWrapper>
    )
}