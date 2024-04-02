import React, { useContext } from 'react';
import { UserContext } from '../../context/user-context';
import styled from 'styled-components';
import { WeekContext } from '../../context/week-context';

const SignOutBtnWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 0 0 10px 10px;
    border: none;
    cursor: pointer;
`

export const LogoutButton = () => {
    const { setNewUserInfo } = useContext(UserContext);
    const { weekData, setWeekData } = useContext(WeekContext)

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

        setWeekData({
            ...weekData,
            dayData: {
                mon: null,
                tue: null,
                wed: null,
                thur: null,
                fri: null,
                sat: null, 
                sun: null
            }
        })

        
    };

    return (
        <SignOutBtnWrapper>
            <Button onClick={handleLogout}>Logout</Button>
        </SignOutBtnWrapper>
    );
};
