import { SelectChangeEvent } from "@mui/material";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/theme-context";
import styled from "styled-components";
import { CiLight, CiDark } from "react-icons/ci";
import { ColorsObj } from "../../types";

const Container = styled.div`
    width: 50%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    margin: 10px 0px;
`

const IconContainer = styled.button<{ current?: boolean, colors?: ColorsObj}>`
    background-color: lightgrey;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
`

const DarkModeToggle = () => {

    const {theme, setNewTheme} = useContext(ThemeContext)

    return (
        <Container>
            <IconContainer onClick={() => setNewTheme('light')} current={theme === 'light'}>
                <CiLight size={40}/>
            </IconContainer>
            <IconContainer onClick={() => setNewTheme('dark')} current={theme === 'dark'}>
                <CiDark size={40}/>
            </IconContainer>
        </Container>
    )
}

export default DarkModeToggle;