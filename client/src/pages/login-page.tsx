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

export const LoginPage = () => {
    const { setNewUserInfo, clientId } = useContext(UserContext);
    const signInButtonRef = useRef<HTMLDivElement>(null);
    console.log("Client ID:: ", clientId)
    
    useEffect(() => {
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
                setNewUserInfo(data, true);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        const script = document.createElement('script');
        script.src = "https://accounts.google.com/gsi/client";
        script.onload = () => {
            if (window.google && signInButtonRef.current) {
                window.google.accounts.id.initialize({
                    client_id: clientId,
                    callback: handleCredentialResponse,
                });
                window.google.accounts.id.renderButton(
                    signInButtonRef.current,
                    { theme: 'outline', size: 'large' }
                );
                window.google.accounts.id.prompt(); // Optionally, display the One Tap prompt
            } else {
                console.error('Google script loaded but google object not available, or ref not set');
            }
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [clientId, setNewUserInfo]);

    return (
        <Container>
            <LoginWrapper>
                <h1>Welcome to Listok!</h1>
                <div ref={signInButtonRef}></div>
            </LoginWrapper>
        </Container>
    );
};
