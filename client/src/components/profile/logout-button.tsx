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

        // Clear user session from local storage or cookies
        localStorage.removeItem('userData');
        localStorage.removeItem('sessionToken');

        // Reset user context to reflect logged-out state
        setNewUserInfo({}, false);

        // Use Google's sign out method
        if (window.google && window.google.accounts) {
            window.google.accounts.id.disableAutoSelect();

            // Optionally, prompt for re-authentication on next sign in for enhanced security
            window.google.accounts.id.revoke(localStorage.getItem('userEmail'), () => {
                console.log("Google user token revoked, user logged out.");
                // Clear email from local storage if you stored it
                localStorage.removeItem('userEmail');
            });
        }
    };

    return (
        <SignOutBtnWrapper>
            <button onClick={handleLogout}>Logout</button>
        </SignOutBtnWrapper>
    );
};
