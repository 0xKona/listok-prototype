import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { MdDelete, MdEditSquare, MdSave } from "react-icons/md";
import { ingredientCategoryOptions } from "../../utils/selectOptions";

const Container = styled.div<{ editing?: boolean }>`
    display: flex;
    width: 100%;
    margin-top: 10px;
    flex-direction: ${props => props.editing ? 'column' : 'row'};
`;
const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 10px;
`
const OptionsWrapper = styled(RowWrapper)`
    justify-content: space-between;
`
const ViewButton = styled.div`
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
`
const EditingButton = styled(ViewButton)` 
    padding: 0 6px;
    border-radius: 5px;
`
const BtnText = styled.p`
    margin-right: 5px;
`
const PreviewContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.06);
    box-shadow: inset 0 -1px 0 #747474;
    &:hover {
        background-color: lightgrey;
    }
`
const PreviewName = styled.div`
    margin-left: 5px;
`
const PreviewAmount = styled(PreviewName)`
`

const IngredientEditor = ({ ingredientsArray, setIngredientsArray, ingredientData, ingredientIndex }: any) => {
    // Using state to directly control input values
    const [editing, setEditing] = useState(false);
    const [ingredientName, setIngredientName] = useState<string>(ingredientData.ingredientName);
    const [ingredientQuantity, setIngredientQuantity] = useState<string>(ingredientData.quantity);
    const [ingredientUnit, setIngredientUnit] = useState(ingredientData.unit)
    const [ingredientCategory, setIngredientCategory] = useState(ingredientData.category || 'Other')

    const updateIngredient = (updatedData: any) => {
        const updatedIngredients = ingredientsArray.map((item: any, index: number) => 
            index === ingredientIndex ? updatedData : item
        );
        setIngredientsArray(updatedIngredients);
    };

    
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIngredientName(event.target.value);
        updateIngredient({ ...ingredientData, ingredientName: event.target.value });
    };

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // This regex matches valid floating point numbers and integers
        const regex = /^[0-9]*\.?[0-9]*$/;
    
        if (value === '' || regex.test(value)) {
          setIngredientQuantity(value);
          updateIngredient({ ...ingredientData, quantity: event.target.value })
        }
      };

    const handleUnitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIngredientUnit(event.target.value);
        updateIngredient({ ...ingredientData, unit: event.target.value });
    };

    const handleCategoryChange = (event: SelectChangeEvent) => {
        setIngredientCategory(event.target.value);
        updateIngredient({ ...ingredientData, category: event.target.value as string });
    };

    const deleteIngredient = () => {
        const newArray = ingredientsArray.filter((_: any, index: number) => index !== ingredientIndex);
        setIngredientsArray(newArray);
    };

    const muiEditing = {width: '50%'}

    return (
        <Container editing={editing}>
            {editing ?
                <>
                    <RowWrapper>
                        <TextField
                            style={muiEditing}
                            id="Name"
                            label="Name"
                            placeholder="Name"
                            value={ingredientName}
                            onChange={handleNameChange}
                        />
                        <FormControl style={muiEditing}>
                            <Select
                                label="Category"
                                value={ingredientCategory}
                                onChange={handleCategoryChange}
                            >
                                {ingredientCategoryOptions.map((option) => (
                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                            <InputLabel>Category</InputLabel>
                        </FormControl>
                    </RowWrapper>
                    <RowWrapper>
                        <TextField
                            id="Amount"
                            label="Amount"
                            type="number"
                            placeholder="Amount"
                            value={ingredientQuantity}
                            onChange={handleQuantityChange}
                        />
                        <TextField
                            id="Units"
                            label="Units *leave blank for qty"
                            placeholder="kg, lb, tspn etc"
                            value={ingredientUnit}
                            onChange={handleUnitChange}
                        />
                    </RowWrapper>
                    <OptionsWrapper>
                        <EditingButton onClick={deleteIngredient}>
                            <BtnText>Delete</BtnText>
                            <MdDelete size={25}/>
                        </EditingButton>
                        <EditingButton onClick={() => setEditing(false)}>
                            <BtnText>Save</BtnText>
                            <MdSave size={25} />
                        </EditingButton>
                    </OptionsWrapper>
                </>
            :
            <PreviewContainer>
                <PreviewName>
                    {ingredientName}             
                </PreviewName>
                <PreviewAmount>
                    {`${ingredientQuantity}${ingredientUnit}`}
                </PreviewAmount>
                <ViewButton onClick={() => setEditing(true)}>
                    <MdEditSquare size={25} />
                </ViewButton>
            </PreviewContainer>
            }
        </Container>
    );
};

export default IngredientEditor;


       