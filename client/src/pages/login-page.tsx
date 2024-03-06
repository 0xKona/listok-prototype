import React from "react";
import styled from "styled-components";
import { LoginButton } from "../components/login";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoginWrapper = styled.div`
    grid-column: 2;
    width: 600px;
    height: 350px;
    /* background-color: orange; */
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    -webkit-box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
    border-radius: 15px;
`

export const LoginPage = () => {

    return (
        <Container>
            <LoginWrapper>
                <h1>Welcome to Listok!</h1>
                <LoginButton />
            </LoginWrapper>
        </Container>
    )
}