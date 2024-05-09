import React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
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

interface Props {
    steps: {label: string, value: number, complete: boolean}[]
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<any>>;
}

interface Step {
    label: string;
    value: number;
    complete: boolean;
  }

const StepTracker = ({steps, currentStep, setCurrentStep}: Props) => {

    const isStepComplete = (currentStep: number): boolean => {
      const currentStepObj = steps.find(step => step.value === currentStep);
      return currentStepObj ? currentStepObj.complete : false;
    };
      
    const StepIcon: React.FC<StepIconProps> = ({ icon, active }) => {
      const stepNumber = typeof icon === 'number' ? icon : 0;
      const completed = isStepComplete(stepNumber - 1);
  
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
        <Stepper style={muiStepperStyle} alternativeLabel>
          {steps.map((step) => (
              <Step key={step.value} onClick={() => setCurrentStep(step)}>
                  <StepLabel StepIconComponent={StepIcon}>{step.label}</StepLabel>
              </Step>
          ))}
        </Stepper>
      </Container>
    )
}

export default StepTracker