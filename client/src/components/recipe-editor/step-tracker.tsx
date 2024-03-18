import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 75%;
    height: 50px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    background-color: blue;
`

const Step = styled.div`
    width: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    background-color: lightgreen;
    cursor: pointer;
`
const Line = styled.div`
    flex-grow: 1;
    background-color: lightcyan;
`
const DrawLine = styled.div`
    width: 100%;
    height: 50%;
    border-bottom: 2px solid black;
`
const StepNumber = styled.div`
    background-color: purple;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 100%;
    border: 2px solid black;
`
const StepTitle = styled.div`
    background-color: pink;
`

interface props {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const StepTracker = ({currentStep, setCurrentStep}: props) => {

    const stepClick = (stepNumber: number): void => {
        setCurrentStep(stepNumber)
    }

    return (
        <Container>
            <Step onClick={() => stepClick(1)}>
                <StepNumber>1</StepNumber>
                <StepTitle>Recipe Details</StepTitle>
            </Step>
            <Line>
                <DrawLine />
            </Line>
            <Step onClick={() => stepClick(2)}>
                <StepNumber>2</StepNumber>
                <StepTitle>Method</StepTitle>
            </Step>
            <Line>
                <DrawLine />
            </Line>
            <Step onClick={() => stepClick(3)}>
                <StepNumber>3</StepNumber>
                <StepTitle>Ingredients</StepTitle>
            </Step>
        </Container>
    )
}

export default StepTracker