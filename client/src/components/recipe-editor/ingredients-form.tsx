import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from '@mui/material/Button';
import IngredientEditor from "./ingredient-editor";


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    max-width: 100%;
    height: 80%;
    flex-grow: 1;
    overflow-y: scroll;
    padding: 10px;
    align-items: center;
`
const NavBtnContainer = styled.div`
    height: 50px; 
    width: 400px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 20px 0px;
`

interface Step {
    label: string;
    value: number;
    complete: boolean;
}

interface IngredientInterface {
    ingredientName: string, 
    quantity: string
}

const IngredientsForm = ({steps, setSteps, setCurrentStep, recipeInfo, setRecipeInfo, uploadRecipe, setShowRecipeEditor}: any) => {
    const [ingredientsArray, setIngredientsArray] = useState<any>(recipeInfo.recipe_ingredients);

    useEffect(() => {
        setRecipeInfo((prevRecipeInfo: any) => ({
            ...prevRecipeInfo,
            recipe_ingredients: ingredientsArray
          }));
    }, [ingredientsArray])
    
    const handleSubmit = async() => {
        const updatedSteps = steps.map((step: Step) => {
            if (step.label === 'Ingredients') {
                return { ...step, complete: true }; // Update the 'Details' step to be complete
            }
            return step;
        });
        setSteps(updatedSteps); // Update the steps state
        await uploadRecipe(recipeInfo);
        //TODO : Loading effect when uploading
        setShowRecipeEditor({open: false, recipeId: null});
    }

    const handleBack = () => {
        setCurrentStep({label: 'Method', value: 1, complete: false});
        const updatedSteps = steps.map((step: Step) => { // Update steps to mark 'Details' as complete
            if (step.label === 'Ingredients') {
                return { ...step, complete: false }; // Update the 'Details' step to be complete
            }
            return step;
        });
        setSteps(updatedSteps); // Update the steps state
    }

    const addNewIngredient = () => {
        const newArray = [...ingredientsArray, {ingredientName: '', quantity: '', unit: '', category: 'Other', checked: false}];
        setIngredientsArray(newArray)
    }
    
    return (
        <>
            <Button onClick={addNewIngredient}>Add New</Button>
            <FormContainer>
                {ingredientsArray.map((ingredient: IngredientInterface, index: number) => (
                    <IngredientEditor key={index} ingredientsArray={ingredientsArray} setIngredientsArray={setIngredientsArray} ingredientData={ingredient} ingredientIndex={index}/>
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