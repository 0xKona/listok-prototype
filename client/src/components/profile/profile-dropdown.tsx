import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { StyleProps } from "../../types";
import { ThemeContext } from "../../context/theme-context";
import { themesObject } from "../../context/themes";
import { LogoutButton } from "./logout-button";
import { UserContext } from "../../context/user-context";
import DarkModeToggle from "./darkmode-toggle";

const DropDownMenuContainer = styled.div`
    width: 250px;
    height: fit-content;
    position: absolute;
    z-index: 1;
    right: 10px;
    top: 55px;
    background-color: white;
    border-radius: 0 0 10px 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
`
const Greeting = styled.h1`
    font-size: 30;
    margin: 20px;
`

const ProfileMenu = (): JSX.Element => {
    const {userObj} = useContext(UserContext);
    const userName = userObj?.userInfo.givenName;
    
    return (
        <DropDownMenuContainer>
            <Greeting>{`Hi ${userName.charAt(0).toUpperCase() + userName.toLowerCase().slice(1)}!`}</Greeting>
            <DarkModeToggle />
            <LogoutButton/>
        </DropDownMenuContainer>   
    )
}

export default ProfileMenu