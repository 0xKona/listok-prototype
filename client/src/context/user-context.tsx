import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

interface UserContextInterface {
    userObj: any;
    setNewUserInfo: any;
    clientId: string
}

export const UserContext = createContext<UserContextInterface>({
    userObj: {},
    setNewUserInfo: () => {},
    clientId: ""
});

export const UserContextProvider = (props: any): JSX.Element => {
    const [userObj, setUserObj] = useState({loggedIn: false, userInfo: {}});
    const [clientId, setClientId] = useState("");

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get('/api/config');
                setClientId(response.data.clientId);
            } catch (error) {
                console.error('Error fetching clientId:', error);
            }
        };

        fetchConfig();
    }, [!clientId]);

    const setNewUserInfo = (newData: any, loggingIn: boolean) => {
        setUserObj({userInfo: newData, loggedIn: loggingIn})
    }
    return (
        <UserContext.Provider value={{ userObj, setNewUserInfo, clientId }}>
            {props.children}
        </UserContext.Provider>
    )
}