import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: auto;
    height: 35px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
`
const CheckBox = styled.div`
    height: 100%;
    aspect-ratio: 1/1;
    background-color: blue;
`
const IngredientName = styled.div`
    width: 50%;

`

const ShoppingItem = ({ingredient}: any): JSX.Element => {

    return (
        <Container>
            <CheckBox>
                
            </CheckBox>
            <IngredientName>
                {ingredient.ingredientName}
            </IngredientName>
            <p>{ingredient.quantity}</p>
        </Container>

    )
}

export default ShoppingItem;
