import React, { useEffect, useContext } from 'react';
import { UserContext } from '../context/user-context';

export const LoginButton = () => {
    const { setNewUserInfo, clientId } = useContext(UserContext);

    const handleCredentialResponse = async (response: any) => {
        console.log("Encoded JWT ID token: " + response.credential);
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: response.credential }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setNewUserInfo({ ...data, loggedIn: true });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        const initGoogleSignIn = () => {
            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCredentialResponse,
            });

            // Conditionally render the button if you specifically want it, or rely on the prompt.
            window.google.accounts.id.renderButton(
                document.getElementById('signInButton'),
                { theme: 'outline', size: 'large' }  // Customize the button appearance
            );

            // This prompts the One Tap UI without needing a user to click the button.
            // Useful for seamless sign-in or sign-up flows.
            window.google.accounts.id.prompt((notification: any) => {
              const momentType = notification.getMomentType();
              switch (momentType) {
                  case "display":
                      console.log("One Tap UI displayed");
                      break;
                  case "skipped":
                      console.log("One Tap UI skipped");
                      // Handle skipped logic here, potentially due to user being already signed in,
                      // user closing the prompt, or multiple accounts being present.
                      break;
                  case "dismissed":
                      console.log("One Tap UI dismissed");
                      // Similar to skipped, but can specifically handle user actively dismissing the UI.
                      break;
                  default:
                      console.error(`Unhandled moment type: ${momentType}`);
              }
          });
          
        };

        if (window.google) {
            initGoogleSignIn();
        } else {
            // Dynamically load the Google Identity Services script if not already loaded
            const script = document.createElement('script');
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = initGoogleSignIn;
            document.head.appendChild(script);
        }
    }, [clientId, setNewUserInfo]);

    return <div id='signInButton'></div>;
};
