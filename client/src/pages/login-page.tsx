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

const LoginPage = () => {
    const { setNewUserInfo, clientId } = useContext(UserContext);
    const signInButtonRef = useRef(null);
  
    useEffect(() => {
      // Check local storage for existing user data to maintain session across refreshes
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        // If user data is found, update context to set user as logged in
        setNewUserInfo(parsedData, true);
      }
    }, [setNewUserInfo]);
  
    useEffect(() => {
      // Handle the response from Google upon user authentication
      const handleCredentialResponse = async (response: any) => {
        try {
          // Send the Google token to the backend for verification
          const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: response.credential }),
          });
  
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  
          // Upon successful verification, store user data for session persistence
          const data = await res.json();
          localStorage.setItem('userData', JSON.stringify(data));
          // Update context with user data, setting user as logged in
          setNewUserInfo(data, true);
        } catch (error) {
          console.error('Login error:', error);
        }
      };
  
      // Dynamically load Google's authentication library script
      const script = document.createElement('script');
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => {
        // Initialize Google's auth library and configure the login button
        if (window.google && signInButtonRef.current) {
          window.google.accounts.id.initialize({
            client_id: clientId, // Google client ID from UserContext
            callback: handleCredentialResponse, // Function to call after authentication
          });
          window.google.accounts.id.renderButton(
            signInButtonRef.current, // Element to render Google sign-in button
            { theme: 'outline', size: 'large' } // Button styling options
          );
          window.google.accounts.id.prompt(); // Optionally display the One Tap sign-in prompt
        } else {
          console.error('Google script loaded but google object not available, or ref not set');
        }
      };
      document.body.appendChild(script);
  
      // Cleanup function to remove the script when component unmounts
      return () => {
          document.body.removeChild(script);
      };
    }, [clientId, setNewUserInfo]);
  
    return (
      <Container>
        <LoginWrapper>
          <h1>Welcome to Listok!</h1>
          <div ref={signInButtonRef}></div> {/* Reference for Google sign-in button */}
        </LoginWrapper>
      </Container>
    );
  };
  
  export default LoginPage;
