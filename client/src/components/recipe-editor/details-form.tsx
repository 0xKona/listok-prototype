import { TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: cyan;
    width: 100%;
    height: 80%;
    padding: -10px;
`
const NavBtnContainer = styled.div`
    width: 100%;
    flex-grow: 1;
    display: flex;
    background-color: lightgreen;
    
`

const DetailsForm = () => {
    const [recipeName, setRecipeName] = useState('')
    const [recipeDescription, setRecipeDescription] = useState('')

    return (
        <>
            <FormWrapper>
                <TextField 
                    fullWidth
                    required
                    id="Recipe-Name"
                    label="Recipe Name"
                    placeholder="Recipe Name"
                    defaultValue={recipeName}
                    onChange={(e) => setRecipeName(e.target.value)}
                />
                <TextField
                    fullWidth
                    id="Recipe-Description"
                    label="Recipe Description"
                    multiline
                    rows={4}
                    placeholder="Recipe Description"
                    defaultValue={recipeDescription}
                    onChange={(e) => setRecipeDescription(e.target.value)}
                />
            </FormWrapper>
            <NavBtnContainer>

            </NavBtnContainer>
        </>
    )
}

export default DetailsForm