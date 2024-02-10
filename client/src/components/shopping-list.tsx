import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/theme-context";
import { themesObject } from "../context/themes";
import { StyleProps } from "../types";

const Container = styled.div`
    width: 35%;
    height: 500px;
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 10px;
`

const ShoppingList = (): JSX.Element => {
    
    return (
        <Container>
            <p>Shopping List</p>
        </Container>
    )
}

export default ShoppingList