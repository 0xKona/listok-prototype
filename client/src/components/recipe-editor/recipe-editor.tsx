import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import StepTracker from "./step-tracker";
import DetailsForm from "./details-form";
import { UserContext } from "../../context/user-context";
import MethodForm from "./method-form";
import IngredientsForm from "./ingredients-form";
import axios from "axios";

//TODO Replace any types
//TODO If any Errors on any form do not allow submission of data to server

const Wrapper = styled.div`
    width: 100%;
    height: fit-content;
    min-height: 100%;
    display: flex;
    justify-content: center;
    padding: 20px 0px;
`
const RecipeEditorContainer = styled.div`
    width: 700px;
    min-width: 400px;
    max-width: 1500px;
    min-height: 80%;
    height: 90%;
    min-height: 700px;
    background-color: white;
    padding: 20px;
    position: relative;
    border-radius: 15px;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CloseButton = styled.div`
    width: fit-content;
    height: fit-content;
    padding: 10px;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    transition: transform 0.5s ease;
    &:hover {
        transform: rotate(-90deg);
    }
`
const FormWrapper = styled.div`
    margin: 10px 0;
    flex-grow: 1;
    width: 400px;
    max-height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`
const CurrentTabTitle = styled.h1`
    margin: 20px 0px;;
`

interface props {
    recipeId: null| number
    setShowRecipeEditor: React.Dispatch<React.SetStateAction<any>>;
}

interface RecipeInfo {
    recipe_id?: number;
    recipe_name: string;
    recipe_desc: string;
    recipe_method: string;
    recipe_image: string;
    recipe_ingredients: { ingredientName: string; quantity: string}[];
    users_user_id: string;
}

const RecipeEditor = ({recipeId, setShowRecipeEditor}: props) => {
    const {userObj} = useContext(UserContext)
    const [steps, setSteps] = useState([
        {label: 'Details', value: 0, complete: false}, 
        {label: 'Method', value: 1, complete: false}, 
        {label: 'Ingredients', value: 2, complete: false}
    ]);
    const [currentStep, setCurrentStep] = useState<any>({label: "Details", value: 0, complete: false});
    const [recipeInfo, setRecipeInfo] = useState<any>({
        recipe_name: '',
        recipe_desc: '',
        recipe_method: '',
        recipe_image: '',
        recipe_image_id: '',
        recipe_ingredients: [{ingredientName: '', quantity: ''}],
        users_user_id: userObj.userInfo.listokId
    })
    
    const fetchRecipeById = async () => {
        try {
            const response = await axios.get(`/api/recipe/${recipeId}`);
            setRecipeInfo({...response.data, recipe_ingredients: JSON.parse(response.data.recipe_ingredients)});
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (recipeId) {
            fetchRecipeById()
        }
    }, [])

    const uploadRecipe = async(recipe: any) => {
        try {
            const response = await fetch(recipe.recipe_image);
            const blob = await response.blob();
    
            const formData = new FormData();
            if (recipeId) {
                formData.append("recipe_id", recipeId.toString());
                formData.append("image_id", recipeInfo.recipe_image_id.toString());
            }
            formData.append("recipe_name", recipe.recipe_name);
            formData.append("recipe_desc", recipe.recipe_desc);
            formData.append("recipe_method", recipe.recipe_method);
            formData.append("recipe_image", blob, "recipe_image.jpg"); // Assuming image name
            formData.append("recipe_ingredients", JSON.stringify(recipe.recipe_ingredients));
            formData.append("users_user_id", recipe.users_user_id.toString());
    
            const apiRoute = recipeId ? '/api/editRecipe' : '/api/uploadRecipe'

            const result = await axios.post(apiRoute, formData, {
                headers: {
                    // Content-Type will be set automatically by the browser
                    'Accept': 'application/json',
                },
            });

        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    return(
        <Wrapper>
            <RecipeEditorContainer>
                <CloseButton onClick={() => setShowRecipeEditor({open: false, recipeId: null})}>
                    <AiOutlineClose color="black" size={30}/>
                </CloseButton>
                <StepTracker steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
                <FormWrapper>
                    <CurrentTabTitle>{currentStep.label}</CurrentTabTitle>
                    {currentStep.value === 0 && 
                        <DetailsForm steps={steps} setSteps={setSteps} setCurrentStep={setCurrentStep} recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo}/>
                    }
                    {currentStep.value === 1 && 
                        <MethodForm steps={steps} setSteps={setSteps} setCurrentStep={setCurrentStep} recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo}/>
                    }
                    {currentStep.value === 2 &&
                        <IngredientsForm 
                            steps={steps} setSteps={setSteps} 
                            setCurrentStep={setCurrentStep} 
                            recipeInfo={recipeInfo} 
                            setRecipeInfo={setRecipeInfo} 
                            uploadRecipe={uploadRecipe}
                            setShowRecipeEditor={setShowRecipeEditor}
                        />
                    }

                </FormWrapper>
            </RecipeEditorContainer>
        </Wrapper>
    )
}

export default RecipeEditor