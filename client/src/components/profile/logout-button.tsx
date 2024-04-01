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
        // Clear user session from local storage
        localStorage.removeItem('userData');
        localStorage.removeItem('sessionToken');

        // Reset user context
        setNewUserInfo({}, false);

        // Use Google's sign out method
        if (window.google && window.google.accounts) {
            window.google.accounts.id.disableAutoSelect();

            // Prompt for re-authentication on next sign in for enhanced security
            window.google.accounts.id.revoke(localStorage.getItem('userEmail'), () => {
                console.log("Google user token revoked, user logged out.");
            });
        }
    };

    return (
        <SignOutBtnWrapper>
            <button onClick={handleLogout}>Logout</button>
        </SignOutBtnWrapper>
    );
};
