import React, { useContext, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import StepTracker from "./step-tracker";
import DetailsForm from "./details-form";
import { UserContext } from "../../context/user.context";

const Wrapper = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    background-color: cyan;
    padding: 20px;
`
const RecipeEditorContainer = styled.div`
    width: 90%;
    min-width: 580px;
    max-width: 1500px;
    height: 90%;
    min-height: 600px;
    background-color: orange;
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
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
`

interface props {
    setShowRecipeEditor: React.Dispatch<React.SetStateAction<boolean>>;
    recipeId?: number
}

const RecipeEditor = ({setShowRecipeEditor, recipeId}: props) => {
    const {userObj} = useContext(UserContext)
    const [steps, setSteps] = useState([
        {label: 'Details', value: 0, complete: false}, 
        {label: 'Method', value: 1, complete: false}, 
        {label: 'Ingredients', value: 2, complete: false}
    ]);
    console.log('Steps : ', steps)
    const [currentStep, setCurrentStep] = useState<any>({label: "Details", value: 0});
    const [recipeInfo, setRecipeInfo] = useState({
        recipe_name: undefined,
        recipe_desc: undefined,
        recipe_method: undefined,
        recipe_image: undefined,
        recipe_ingredients: undefined,
        users_user_id: userObj.userInfo.listokId
    })
    console.log('RecipeInfo: ', recipeInfo)
    // console.log(currentStep)
    return(
        <Wrapper>
            <RecipeEditorContainer>
                <CloseButton onClick={() => setShowRecipeEditor(false)}>
                    <AiOutlineClose color="black" size={30}/>
                </CloseButton>
                <StepTracker steps={steps} currentStep={currentStep} setCurrentStep={setCurrentStep} />
                <FormWrapper>
                    <h1>{currentStep.label}</h1>
                    {currentStep.value === 0 && <DetailsForm steps={steps} setSteps={setSteps} setCurrentStep={setCurrentStep} recipeInfo={recipeInfo} setRecipeInfo={setRecipeInfo}/>}

                </FormWrapper>
            </RecipeEditorContainer>
        </Wrapper>
    )
}

export default RecipeEditor