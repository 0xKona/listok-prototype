import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { UserContext } from '../context/user.context';

export const LoginButton = () => {

    const {setNewUserInfo, clientId} = useContext(UserContext)

    const onSuccess = async(res: any) => {
        const tokenId = res.tokenId;

        try {
            const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ token: tokenId }),
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (response.ok) {
              setNewUserInfo({...res.profileObj, listokId: data.listokId}, true)
            }
          } catch (error) {
            console.error('Error:', error);
          }
    }
    const onFailure = (res: any) => {
        console.log("LOGIN FAILED! res: ", res);
    }

    return (
        <div id='signInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login with Google'
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}