import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { UserContext } from '../context/user.context';

export const LoginButton = () => {

    const {setNewUserInfo, clientId} = useContext(UserContext)

    const onSuccess = (res: any) => {
        setNewUserInfo(res.profileObj, true)
    }
    const onFailure = (res: any) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return (
        <div id='signInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}