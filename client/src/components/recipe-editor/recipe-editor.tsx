import React from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const RecipeEditorContainer = styled.div`
    width: 90%;
    max-width: 1500px;
    height: 90%;
    background-color: orange;
    padding: 20px;
    position: relative;
    border-radius: 15px;
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75);
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

interface props {
    setShowRecipeEditor: React.Dispatch<React.SetStateAction<boolean>>;
    recipeId?: number
}

const RecipeEditor = ({setShowRecipeEditor, recipeId}: props) => {

    return(
        <Wrapper>
            <RecipeEditorContainer>
                <CloseButton onClick={() => setShowRecipeEditor(false)}>
                    <AiOutlineClose color="black" size={30}/>
                </CloseButton>
                
                <p>Hi!</p>

            </RecipeEditorContainer>
        </Wrapper>
    )
}

export default RecipeEditor