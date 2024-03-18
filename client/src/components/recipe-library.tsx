import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/theme-context";
import { themesObject } from "../context/themes";
import { StyleProps } from "../types";

const Container = styled.div`
    width: 60%;
    height: 500px;
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 10px;
`
//TODO : types
const RecipeLibrary = ({setShowRecipeEditor}: any): JSX.Element => {

    return (
        <Container>
            <p>Recipe Library</p>
            <button onClick={() => setShowRecipeEditor(true)}>Open Recipe Editor</button>
        </Container>
    )
}

export default RecipeLibrary