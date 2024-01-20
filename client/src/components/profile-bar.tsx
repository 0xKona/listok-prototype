import React from "react";
import styled from "styled-components";
import { StyleProps } from "../types";
import { ThemeContext } from "../context/theme-context";
import { themesObject } from "../context/themes";

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
            <h2>Profile Here</h2>
        </ProfileContainer>
    )
}

export default ProfileBar