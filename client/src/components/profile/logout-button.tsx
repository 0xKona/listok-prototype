import React, { useContext } from 'react';
import { UserContext } from '../../context/user-context';
import styled from 'styled-components';

const SignOutBtnWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LogoutButton = () => {
    
    const { setNewUserInfo } = useContext(UserContext);

    const handleLogout = () => {
        console.log("Logging out...");
        // Use Google's sign out method
        window.google.accounts.id.disableAutoSelect();

        // Optionally, revoke the token to fully sign out the user
        // Note: Replace `token` with the actual token you wish to revoke
        // fetch(`https://oauth2.googleapis.com/revoke?token=${token}`, {
        //   method: 'POST',
        // }).then(() => {
            console.log("Logged out successfully");
            setNewUserInfo({}, false);
        // });

        // You might want to redirect the user to the homepage or a login page
        // window.location.href = '/';
    }

    return (
        <SignOutBtnWrapper>
            <button onClick={handleLogout}>Logout of Google</button>
        </SignOutBtnWrapper>
    );
};
