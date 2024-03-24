import { Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { StepIconProps } from '@mui/material/StepIcon';

const Container = styled.div`
    width: 75%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const muiStepperStyle = {
    width: '100%',
}

interface props {
    steps: {label: string, value: number, complete: boolean}[]
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<any>>;
}

interface Step {
    label: string;
    value: number;
    complete: boolean;
  }

const StepTracker = ({steps, currentStep, setCurrentStep}: props) => {

    const isStepComplete = (currentStep: number): boolean => {
        const currentStepObj = steps.find(step => step.value === currentStep);
        return currentStepObj ? currentStepObj.complete : false;
      };
      
      const StepIcon: React.FC<StepIconProps> = ({ icon, active }) => {
        // Ensuring 'icon' is always treated as a number
        const stepNumber = typeof icon === 'number' ? icon : 0;
        const completed = isStepComplete(stepNumber - 1); // Adjust for zero-based indexing if necessary
    
        if (completed) {
          return <CheckCircleIcon style={{ color: 'green' }} />;
        } else {
          return (
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: active ? '#3f51b5' : '#e0e0e0',
                color: active ? '#fff' : '#000',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {stepNumber}
            </div>
          );
        }
      };

    return (
        <Container>
            <Stepper style={muiStepperStyle} activeStep={currentStep} alternativeLabel>
                {steps.map((label: any) => (
                    <Step key={label.value} onClick={() => setCurrentStep(label)}>
                        <StepLabel StepIconComponent={StepIcon}>{label.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Container>
    )
}

export default StepTracker