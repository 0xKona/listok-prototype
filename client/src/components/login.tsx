import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { UserContext } from '../context/user.context';

const clientId = "487824460304-7enq26pcdfqpfe6r3rbpv034o9inoptt.apps.googleusercontent.com" //client id here TODO: Change to import from .env

export const LoginButton = () => {

    const {setNewUserInfo} = useContext(UserContext)

    const onSuccess = (res: any) => {
        console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
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