import React, { useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import { UserContext } from '../context/user-context';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginWrapper = styled.div`
    width: 600px;
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
    border-radius: 15px;
`;

type CredentialResponse = {
    credential: string;
};

export const LoginPage = (): JSX.Element => {
    const { setNewUserInfo, clientId } = useContext(UserContext);
    const signInButtonRef = useRef<HTMLDivElement>(null);

    const handleCredentialResponse = async (response: CredentialResponse) => {
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
        let script: HTMLScriptElement | null = null;

        const initGoogleSignIn = () => {
            if (!window.google) {
                console.error('Google Identity Services not available');
                return;
            }

            window.google.accounts.id.initialize({
                client_id: clientId,
                callback: handleCredentialResponse,
            });

            if (signInButtonRef.current) {
                window.google.accounts.id.renderButton(
                    signInButtonRef.current,
                    { theme: 'outline', size: 'large' } // Customize the button appearance
                );
            }

            window.google.accounts.id.prompt((notification: any) => {
                console.log(`One Tap UI moment occurred: ${notification.getMomentType()}`);
            });
        };

        if (window.google) {
            initGoogleSignIn();
        } else {
            script = document.createElement('script');
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = initGoogleSignIn;
            script.onerror = (error) => {
                console.error("Error loading Google Identity Services script:", error);
            };
            document.head.appendChild(script);
        }

        return () => {
            if (script) document.head.removeChild(script);
        };
    }, [clientId, setNewUserInfo]);

    return (
        <Container>
            <LoginWrapper>
                <h1>Welcome to Listok!</h1>
                <div ref={signInButtonRef} id='signInButton'></div>
            </LoginWrapper>
        </Container>
    );
};
