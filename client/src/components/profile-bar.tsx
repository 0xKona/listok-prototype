import React from "react";
import styled from "styled-components";
import { StyleProps } from "../types";
import { ThemeContext } from "../context/theme-context";
import { themesObject } from "../context/themes";
import { LogoutButton } from "./logout";

const ProfileContainer = styled.div`
    height: 50px;
    width: fit-content;
    background-color: pink;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ProfileBar = (): JSX.Element => {

    return (
        <ProfileContainer>
            <LogoutButton />
        </ProfileContainer>
    )
}

export default ProfileBar