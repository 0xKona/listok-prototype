import React, { createContext, useState } from 'react';

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

    const clientId = "487824460304-7enq26pcdfqpfe6r3rbpv034o9inoptt.apps.googleusercontent.com" 
    //TODO: Change clientId to import from .env


    const setNewUserInfo = (newData: any, loggingIn: boolean) => {
        setUserObj({userInfo: newData, loggedIn: loggingIn})
    }
    return (
        <UserContext.Provider value={{ userObj, setNewUserInfo, clientId }}>
            {props.children}
        </UserContext.Provider>
    )
}