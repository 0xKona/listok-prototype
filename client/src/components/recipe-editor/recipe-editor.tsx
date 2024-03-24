import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import StepTracker from "./step-tracker";
import DetailsForm from "./details-form";
import { UserContext } from "../../context/user.context";
import MethodForm from "./method-form";
import IngredientsForm from "./ingredients-form";

const Wrapper = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
    background-color: cyan;
    padding: 20px 0px;
`
const RecipeEditorContainer = styled.div`
    width: 700px;
    min-width: 400px;
    max-width: 1500px;
    min-height: fit-content;
    height: 90%;
    min-height: 600px;
    background-color: #b30047;
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
    transition: transform 0.5s ease; /* Add this line for smooth transition */ 
    &:hover {
        transform: rotate(-90deg); /* Add this line to rotate on hover */
    }
`
const FormWrapper = styled.div`
    margin: 10px 0;
    background-color: lightgrey;
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
    setShowRecipeEditor: React.Dispatch<React.SetStateAction<boolean>>;
    recipeId?: number
}

interface RecipeInfo {
    recipe_name: string;
    recipe_desc: string;
    recipe_method: string;
    recipe_image: string; // Assuming this is a blob URL in string format
    recipe_ingredients: { ingredientName: string; quantity: string; measureBy: string }[];
    users_user_id: string; // Adjust the type as necessary
}


const RecipeEditor = ({setShowRecipeEditor, recipeId}: props) => {
    const {userObj} = useContext(UserContext)
    const [steps, setSteps] = useState([
        {label: 'Details', value: 0, complete: false}, 
        {label: 'Method', value: 1, complete: false}, 
        {label: 'Ingredients', value: 2, complete: false}
    ]);
    // console.log('Steps : ', steps)
    const [currentStep, setCurrentStep] = useState<any>({label: "Details", value: 0});
    const [recipeInfo, setRecipeInfo] = useState({
        recipe_name: undefined,
        recipe_desc: undefined,
        recipe_method: undefined,
        recipe_image: undefined,
        recipe_ingredients: [{ingredientName: '', quantity: ''}],
        users_user_id: userObj.userInfo.listokId
    })
    console.log('RecipeInfo: ', recipeInfo)
    // console.log(currentStep)

    async function uploadRecipe(recipe: any) {
        try {
            // Convert blob URL to blob
            const response = await fetch(recipe.recipe_image);
            const blob = await response.blob();
    
            // Prepare FormData
            const formData = new FormData();
            formData.append("recipe_name", recipe.recipe_name);
            formData.append("recipe_desc", recipe.recipe_desc);
            formData.append("recipe_method", recipe.recipe_method);
            formData.append("recipe_image", blob, "recipe_image.jpg"); // Assuming image name
            formData.append("recipe_ingredients", JSON.stringify(recipe.recipe_ingredients));
            formData.append("users_user_id", recipe.users_user_id.toString());
    
            // Send FormData
            const apiResponse = await fetch('/api/uploadRecipe', {
                method: 'POST',
                body: formData,
            });
    
            if (!apiResponse.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await apiResponse.json();
            console.log('Success:', responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    return(
        <Wrapper>
            <RecipeEditorContainer>
                <CloseButton onClick={() => setShowRecipeEditor(false)}>
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
                        <IngredientsForm steps={steps} setSteps={setSteps} setCurrentStep={setCurrentStep} recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo} uploadRecipe={uploadRecipe}/>
                    }

                </FormWrapper>
            </RecipeEditorContainer>
        </Wrapper>
    )
}

export default RecipeEditor