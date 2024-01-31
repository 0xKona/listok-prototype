import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/theme-context";
import { themesObject } from "../context/themes";
import { StyleProps } from "../types";
import ProfileBar from "./profile-bar";

const HeaderContainer = styled.div<StyleProps>`
    height: 50px;
    width: 100vw;
    background-color: ${props => props.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
`

const Header = (): JSX.Element => {

    const {theme} = useContext(ThemeContext)

    return (
        <HeaderContainer colors={themesObject[theme]}>
            <h1>Listok!</h1>
            <ProfileBar />


        </HeaderContainer>
    )
}

export default Header;