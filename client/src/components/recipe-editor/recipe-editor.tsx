import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import StepTracker from "./step-tracker";
import DetailsForm from "./details-form";

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
    const [currentStep, setCurrentStep] = useState<number>(1);
    const stepName = () => currentStep === 1 ? "Details" : currentStep === 2 ? "Method" : "Ingredients"

    return(
        <Wrapper>
            <RecipeEditorContainer>
                <CloseButton onClick={() => setShowRecipeEditor(false)}>
                    <AiOutlineClose color="black" size={30}/>
                </CloseButton>
                <StepTracker currentStep={currentStep} setCurrentStep={setCurrentStep} />
                <FormWrapper>
                    <h1>{stepName()}</h1>
                    {currentStep === 1 && <DetailsForm />}

                </FormWrapper>
            </RecipeEditorContainer>
        </Wrapper>
    )
}

export default RecipeEditor