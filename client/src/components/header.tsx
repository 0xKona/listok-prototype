import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/theme-context";
import { themesObject } from "../context/themes";
import { StyleProps } from "../types";
import ProfileBar from "./profile/profile-bar";
import { ReactComponent as Logo} from "../assets/logo.svg";

const HeaderContainer = styled.div<StyleProps>`
    height: 50px;
    width: 100vw;
    background-color: ${props => props.colors.background};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
`

const ListokLogo = styled(Logo)`
    height: ${props => props.height}; 
    width: auto;
    fill: ${props => props.fill || 'white'}; // Default fill color
`;



const Header = (): JSX.Element => {

    const {theme} = useContext(ThemeContext)

    return (
        <HeaderContainer colors={themesObject[theme]}>
            <ListokLogo height="100%" fill={`${themesObject[theme].textOnSurface}`} />
            <ProfileBar />
        </HeaderContainer>
    )
}

export default Header;