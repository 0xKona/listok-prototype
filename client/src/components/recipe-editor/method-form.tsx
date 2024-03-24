import { TextField } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';


const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 100%;
    height: 80%;
`
const NavBtnContainer = styled.div`
    width: 400px;
    max-width: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    padding: 20px 0px;
`

const muiMethodInputStyles = {
    width: '100%',
    height: '100%',
    marginTop: "15px"
}

interface Step {
    label: string;
    value: number;
    complete: boolean;
  }

const MethodForm = ({steps, setSteps, setCurrentStep, recipeInfo, setRecipeInfo}: any) => {
    const [methodText, setMethodText] = useState(recipeInfo.recipe_method);

    const handleSubmit = () => {
        setRecipeInfo({...recipeInfo, recipe_method: methodText});
        setCurrentStep({label: 'Ingredients', value: 2, complete: false});

        // Update steps to mark 'Details' as complete
        const updatedSteps = steps.map((step: Step) => {
            if (step.label === 'Method') {
                return { ...step, complete: true }; // Update the 'Details' step to be complete
            }
            return step;
        });
        setSteps(updatedSteps); // Update the steps state
    }

    const handleBack = () => {
        setRecipeInfo({...recipeInfo, recipe_method: methodText});
        setCurrentStep({label: 'Details', value: 0, complete: false});

        // Update steps to mark 'Details' as not complete
        const updatedSteps = steps.map((step: Step) => {
            if (step.label === 'Method') {
                return { ...step, complete: false }; // Update the 'Details' step to be not complete
            }
            return step;
        });
        setSteps(updatedSteps); // Update the steps state
    }

    return (
        <>
            <FormWrapper>
                <TextField
                    style={muiMethodInputStyles}
                    id="Recipe-Method"
                    label="Recipe Method (Optional)"
                    multiline
                    placeholder="Recipe Description"
                    rows={18}
                    defaultValue={methodText}
                    onChange={(e) => setMethodText(e.target.value)}
                />
            </FormWrapper>
            <NavBtnContainer>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleSubmit}>Continue</Button>
            </NavBtnContainer>
        </>
    )
}

export default MethodForm;