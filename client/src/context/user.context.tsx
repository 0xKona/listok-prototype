import React, { createContext, useState } from 'react';

interface UserContextInterface {
    userObj: any;
    setNewUserInfo: any;
}

export const UserContext = createContext<UserContextInterface>({
    userObj: {},
    setNewUserInfo: () => {}
});

export const UserContextProvider = (props: any): JSX.Element => {
    const [userObj, setUserObj] = useState({loggedIn: false, userInfo: {}});

    const setNewUserInfo = (newData: any, loggingIn: boolean) => {
        setUserObj({userInfo: newData, loggedIn: loggingIn})
    }
    return (
        <UserContext.Provider value={{ userObj, setNewUserInfo }}>
            {props.children}
        </UserContext.Provider>
    )
}