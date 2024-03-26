import { IconButton, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { muiInputStyles } from "../../styles/global";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';


const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    max-width: 100%;
    height: 80%;
`
const NavBtnContainer = styled.div`
    width: 400px;
    max-width: 100%;
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 20px 0px;
`
const ImageDropBox = styled.label<{ bgImage?: string }>`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;
    margin-top: 20px;
    border: 1px dashed rgba(0, 0, 0, 0.87);
    width: 100%;
    flex-grow: 1;
    min-height: 150px;
    border-radius: 5px;
    background-image: url(${props => props.bgImage});
    background-size: cover;
    background-position: center;
    position: relative;
    color: #545454;
    &:hover {
        border-style: solid;
    }
`;

const VisuallyHiddenInput = styled.input`
  visibility: hidden;
  width: 0;
  height: 0;
`;

const DeleteImage = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: white;
    border-radius: 100%;
`;

interface Step {
    label: string;
    value: number;
    complete: boolean;
  }


const DetailsForm = ({steps, setSteps, setCurrentStep, recipeInfo, setRecipeInfo}: any) => {
    const [recipeName, setRecipeName] = useState(recipeInfo.recipe_name);
    const [recipeDescription, setRecipeDescription] = useState(recipeInfo.recipe_desc);
    const [nameErrors, setNameErrors] = useState<string[] | null>(null);
    const [recipeImage, setRecipeImage] = useState<string>(recipeInfo.recipe_image);

    useEffect(() => {
        if (recipeName) {
            validateRecipeName(recipeName)
        }
    }, [])

    const validateRecipeName = (input: string): void => {
        const errors: string[] = [];
        if (input.length < 3 || input.length > 100) {
            errors.push("Text must be between 3 and 100 characters in length.");
        }
        if (!/^[a-zA-Z0-9 \-]+$/.test(input)) {
            errors.push("Text must not contain special characters except hyphens (-).");
        }
    
        setNameErrors(errors); // This will set the errors regardless if there are any or not
    
        // Now update the 'Details' step based on whether there are any errors
        const updatedSteps = steps.map((step: Step) => {
            if (step.label === 'Details') {
                return { ...step, complete: errors.length === 0 }; // Complete is true if there are no errors
            }
            return step;
        });
    
        setSteps(updatedSteps); // Update the steps state
    };

    //Image Upload Functions start
    const handleImageUpload = (event: React.ChangeEvent<any>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setRecipeImage(URL.createObjectURL(file));
        }
    };

    const handleDrop = (event: React.DragEvent<any>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setRecipeImage(URL.createObjectURL(file));
        }
    };

    const handleDragOver = (event: React.DragEvent<any>) => {
        event.preventDefault(); // Prevent default to allow drop
    };
    
    const handleDeleteImage = (event: any) => {
        event.stopPropagation(); // Prevent the click from bubbling to the label
        setRecipeImage(''); // Reset the image
    };
    //Image end


    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setRecipeName(e.target.value)
        validateRecipeName(e.target.value)
    }

    const handleSubmit = () => {
        setRecipeInfo({...recipeInfo, recipe_name: recipeName, recipe_desc: recipeDescription, recipe_image: recipeImage});
        setCurrentStep({label: 'Method', value: 1, complete: false});

        // Update steps to mark 'Details' as complete
        const updatedSteps = steps.map((step: Step) => {
            if (step.label === 'Details') {
                return { ...step, complete: true }; // Update the 'Details' step to be complete
            }
            return step;
        });
        setSteps(updatedSteps); // Update the steps state
    }

    return (
        <>
            <FormWrapper>
                <TextField 
                    style={muiInputStyles}
                    required
                    id="Recipe-Name"
                    label="Recipe Name"
                    placeholder="Recipe Name"
                    value={recipeName}
                    onChange={(e) => handleNameChange(e)}
                    error={nameErrors !== null && nameErrors.length > 0} // TextField will show error styling if there are errors
                    helperText={nameErrors && nameErrors.join(". ") + '.'} // Join errors into a single string and display as helper text
                />
                <TextField
                    style={muiInputStyles}
                    id="Recipe-Description"
                    label="Recipe Description (Optional)"
                    multiline
                    rows={4}
                    placeholder="Recipe Description"
                    defaultValue={recipeDescription}
                    onChange={(e) => setRecipeDescription(e.target.value)}
                />
                <ImageDropBox
                    bgImage={recipeImage}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    htmlFor="image-upload" // This associates the label with the input
                >
                    {recipeImage &&
                        <DeleteImage onClick={handleDeleteImage}>
                            <IconButton aria-label="delete" size="small">
                                <DeleteIcon />
                            </IconButton>
                        </DeleteImage>
                    }
                    {!recipeImage && 'Click here or drag and drop an image to upload'}
                    <VisuallyHiddenInput
                        id="image-upload" // This ID matches the htmlFor attribute of the label
                        accept="image/jpeg, image/png"
                        type="file"
                        onChange={handleImageUpload}
                    />
                </ImageDropBox>
            </FormWrapper>
            <NavBtnContainer>
                <Button disabled={(nameErrors && nameErrors.length > 0) || nameErrors === null} onClick={handleSubmit}>Continue</Button>
            </NavBtnContainer>
        </>
    )
}

export default DetailsForm