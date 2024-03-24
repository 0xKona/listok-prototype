import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import IngredientEditor from "./ingredient-editor";


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 100%;
    height: 80%;
    flex-grow: 1;
    overflow-y: scroll;
`
const NavBtnContainer = styled.div`
    height: 50px; 
    width: 400px;
    max-width: 100%;
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

interface IngredientInterface {
    ingredientName: string, 
    measureBy: string, 
    quantity: string
}

const IngredientsForm = ({steps, setSteps, setCurrentStep, recipeInfo, setRecipeInfo}: any) => {
    const [ingredientsArray, setIngredientsArray] = useState<any>(recipeInfo.recipe_ingredients);
    console.log('Recipe Info At Load: ', recipeInfo)
    useEffect(() => {
        setRecipeInfo((prevRecipeInfo: any) => ({
            ...prevRecipeInfo,
            recipe_ingredients: ingredientsArray
          }));
    }, [ingredientsArray])
    
    const handleSubmit = () => {
        // setRecipeInfo((prevRecipeInfo: any) => ({
        //     ...prevRecipeInfo,
        //     recipe_ingredients: ingredientsArray
        //   }));
        setCurrentStep({label: 'Ingredients', value: 2, complete: false});

        // Update steps to mark 'Details' as complete
        const updatedSteps = steps.map((step: Step) => {
            if (step.label === 'Ingredients') {
                return { ...step, complete: true }; // Update the 'Details' step to be complete
            }
            return step;
        });
        setSteps(updatedSteps); // Update the steps state
    }

    const handleBack = () => {
        // setRecipeInfo((prevRecipeInfo: any) => ({
        //     ...prevRecipeInfo,
        //     recipe_ingredients: ingredientsArray
        //   }));
        setCurrentStep({label: 'Method', value: 1, complete: false});

        // Update steps to mark 'Details' as complete
        const updatedSteps = steps.map((step: Step) => {
            if (step.label === 'Ingredients') {
                return { ...step, complete: false }; // Update the 'Details' step to be complete
            }
            return step;
        });
        setSteps(updatedSteps); // Update the steps state
    }

    const addNewIngredient = () => {
        const newArray = [...ingredientsArray, {ingredientName: '', measureBy: '', quantity: ''}];
        console.log('New Array: ',newArray)
        setIngredientsArray(newArray)
    }
    // console.log('Ingredients Array: ', ingredientsArray)
    return (
        <>
            <Button onClick={addNewIngredient}>Add New</Button>
            <FormContainer>
                {ingredientsArray.map((ingredient: IngredientInterface, index: number) => (
                    <IngredientEditor ingredientsArray={ingredientsArray} setIngredientsArray={setIngredientsArray} ingredientData={ingredient} ingredientIndex={index}/>
                ))}
            </FormContainer>
            <NavBtnContainer>
                <Button onClick={handleBack}>Back</Button>
                <Button onClick={handleSubmit}>Continue</Button>
            </NavBtnContainer>
        </>
    )
}

export default IngredientsForm;