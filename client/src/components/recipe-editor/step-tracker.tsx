import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: blue; */
`

const muiStepperStyle = {
    width: '100%',
}

interface props {
    steps: {label: string, value: number, complete: boolean}[]
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<any>>;
}

const StepTracker = ({steps, currentStep, setCurrentStep}: props) => {

    return (
        <Container>
            <Stepper style={muiStepperStyle} activeStep={currentStep} alternativeLabel>
                {steps.map((label: any) => (
                    <Step key={label.value} onClick={() => setCurrentStep(label)}>
                        <StepLabel>{label.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Container>
    )
}

export default StepTracker