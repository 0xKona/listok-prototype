import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";

const Container = styled.div`
    display: flex;
    width: 100%;
    background-color: orange;
`;

const DeleteButton = styled.div`
    height: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
        background-color: darkgrey;
    }
`;

const IngredientEditor = ({ ingredientsArray, setIngredientsArray, ingredientData, ingredientIndex }: any) => {
    // Using state to directly control input values
    const [ingredientName, setIngredientName] = useState<string>(ingredientData.ingredientName);
    const [measureBy, setMeasureBy] = useState<string>(ingredientData.measureBy);
    const [ingredientAmount, setIngredientAmount] = useState<string>(ingredientData.quantity);

    const measureByOptions = [{ label: 'Quantity', value: 'true' }, { label: 'Amount', value: 'false' }];

    const handleChange = (event: SelectChangeEvent) => {
        const newMeasureBy = event.target.value === 'true' ? 'Quantity' : 'Amount';
        updateIngredient({ ...ingredientData, measureBy: newMeasureBy });
        setMeasureBy(newMeasureBy);
    };

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
                variant="standard"
                placeholder="Name"
                value={ingredientName}
                onChange={handleNameChange}
            />
            <FormControl size="small">
                <Select
                    labelId="measure-select-label"
                    id="measure-select"
                    value={measureBy === 'Quantity' ? 'true' : 'false'}
                    onChange={handleChange}
                    variant="filled"
                >
                    {measureByOptions.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField
                id="Amount"
                label="Amount"
                variant="standard"
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
