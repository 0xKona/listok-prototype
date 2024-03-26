import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";

const Container = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
`;

const DeleteButton = styled.div`
    height: 56px;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.06);
    box-shadow: inset 0 -1px 0 #747474;
    &:hover {
        background-color: darkgrey;
    }
`;

const IngredientEditor = ({ ingredientsArray, setIngredientsArray, ingredientData, ingredientIndex }: any) => {
    // Using state to directly control input values
    const [ingredientName, setIngredientName] = useState<string>(ingredientData.ingredientName);
    const [ingredientAmount, setIngredientAmount] = useState<string>(ingredientData.quantity);

    const updateIngredient = (updatedData: any) => {
        const updatedIngredients = ingredientsArray.map((item: any, index: number) => 
            index === ingredientIndex ? updatedData : item
        );
        setIngredientsArray(updatedIngredients);
    };

    // Handlers for text fields
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIngredientName(event.target.value);
        updateIngredient({ ...ingredientData, ingredientName: event.target.value });
    };

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIngredientAmount(event.target.value);
        updateIngredient({ ...ingredientData, quantity: event.target.value });
    };

    const deleteIngredient = () => {
        const newArray = ingredientsArray.filter((_: any, index: number) => index !== ingredientIndex);
        setIngredientsArray(newArray);
    };

    return (
        <Container>
            <TextField
                id="Name"
                label="Name"
                variant="filled"
                placeholder="Name"
                value={ingredientName}
                onChange={handleNameChange}
            />

            <TextField
                id="Amount"
                label="Amount"
                variant="filled"
                placeholder="Amount"
                value={ingredientAmount}
                onChange={handleAmountChange}
            />
            <DeleteButton onClick={deleteIngredient}>
                <MdDelete size={25}/>
            </DeleteButton>
        </Container>
    );
};

export default IngredientEditor;
