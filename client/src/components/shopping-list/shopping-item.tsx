import React, { useState } from "react";
import styled from "styled-components";
import CheckIcon from '@mui/icons-material/Check'; // Ensure you've imported the icon

const Container = styled.div`
    width: auto;
    height: 35px;
    background-color: white;
    margin-bottom: 10px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 3px 4px rgba(0,0,0,0.55);
    cursor: pointer;
`
const CheckBox = styled.label<{checked: boolean}>`
    height: 20px;
    width: 20px;
    border-radius: 50%;
    border: 2px solid #ccc; // Grey border
    background-color: ${(props) => props.checked ? '#0f0' : 'transparent'}; // Change background based on checked state
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    cursor: pointer;

    svg {
        color: #fff; // White check icon if checked
    }
`;
const IngredientName = styled.div`
    width: 50%;

`

const ShoppingItem = ({ingredient, ingredientIndex}: any): JSX.Element => {

    const [checked, setChecked] = useState(ingredient.checked)

    return (
        <Container onClick={() => setChecked(!checked)}>
            <CheckBox checked={checked}>
                {checked && <CheckIcon />}  
            </CheckBox>
            <IngredientName>
                {ingredient.ingredientName}
            </IngredientName>
            <p>{`${ingredient.quantity}${ingredient.unit}`}</p>
        </Container>

    )
}

export default ShoppingItem;
