import { FormControl, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdDelete } from "react-icons/md";

const Container = styled.div`
    display: flex;
    width: 100%;
    background-color: orange;
`
const DeleteButton = styled.div`
    height: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color: darkgrey;
    }
`

const IngredientEditor = ({ingredientsArray, setIngredientsArray, ingredientData, ingredientIndex}: any) => {
    console.log('IG: ', ingredientData)
    const [ingredientName, setIngredientName] = useState(ingredientData.name);
    const [measureBy, setMeasureBy] = useState(ingredientData.measureBy);
    const [ingredientAmount, setIngredientAmount] = useState(ingredientData.quantity);
    
    const [newIngredientObj, setNewIngredientObject] = useState<any>(ingredientData)

    const [selectedOption, setSelectedOption] = useState<any>(true);
    const measureByOptions = [{label: 'Quantity', value: true}, {label: 'Amount', value: false}]

    const handleChange = (event: SelectChangeEvent<boolean>) => {
        setSelectedOption(event.target.value);
        event.target.value ? setMeasureBy(measureByOptions[0]) : setMeasureBy(measureByOptions[1])
    };

    const deleteIngredient = () => {
        const newArray = ingredientsArray.filter((_: any, index: number) => index !== ingredientIndex);
        setIngredientsArray(newArray);
    };

    useEffect(() => {
        setNewIngredientObject({ingredientName: ingredientName, measureBy: measureBy, quantity: ingredientAmount})
    }, [ingredientName, measureBy, ingredientAmount])
    
    useEffect(() => {
        // Only run if newIngredientObj is defined
        if (newIngredientObj) {
            // Create a new array with the updated ingredient
            const updatedIngredientsArray = ingredientsArray.map((item: any, index: number) => {
                if (index === ingredientIndex) {
                    return newIngredientObj;
                }
                return item;
            });
    
            // Update the parent component's state with the new array
            setIngredientsArray(updatedIngredientsArray);
        }
    }, [newIngredientObj]);

    console.log('New Ingredient Obj: ', newIngredientObj)
    return(
        <Container>
            <TextField
                id="Name"
                label="Name"
                variant="standard"
                placeholder="Name"
                defaultValue={ingredientName}
                onChange={(e) => setIngredientName(e.target.value)}
            />
            <FormControl size="small">
            <Select
                labelId="measure-select-label"
                id="measure-select"
                value={selectedOption}
                onChange={handleChange}
                variant="filled"
            >
                {measureByOptions.map((option, index) => (
                    <MenuItem key={index} value={option.value.toString()}>
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
                defaultValue={ingredientName}
                onChange={(e) => setIngredientAmount(e.target.value)}
            />
            <DeleteButton onClick={deleteIngredient}>
                <MdDelete size={25}/>
            </DeleteButton>
        </Container>
    )
}

export default IngredientEditor;