import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaRegEdit } from "react-icons/fa";


const Container = styled.div<{ backgroundImage?: string }>`
    height: 200px;
    width: 150px;
    margin: 5px;
    border-radius: 15px;
    background-color: orange;
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.75);
    &:hover{
        transform: scale(1.05);
    }
`;

const ImageArea = styled.div<{ backgroundImage?: string }>`
    height: 80%;
    width: 100%;
    border-radius: 15px 15px 0px 0px;
    background-color: white;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    transition: all .15s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: flex-end;
`

const RecipeTitleWrapper = styled.div`
    width: 100%;
    background: rgba(255, 255, 255, 0.43);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8.4px);
    -webkit-backdrop-filter: blur(8.4px);
    text-align: center;
`
// const ButtonArea = styled.div`
//     background-color: pink;
//     width: 100%;
//     flex-grow: 1;
// `
const EditBtn = styled.button`
    width: 100%;
    height: 20%;
    border: none;
    border-radius: 0 0 15px 15px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface RecipeCardProps {
    recipe: {
        recipe_id: number;
        recipe_name: string;
        recipe_image_id: number;
    };
}

const RecipeCard = ({ recipe, setShowRecipeEditor }: any): JSX.Element => {
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`/api/image/${recipe.recipe_image_id}`);
                const base64Image = await response.text();
                setImageUrl(`data:image/jpeg;base64,${base64Image}`);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        if (recipe.recipe_image_id) {
            fetchImage();
        }
    }, [recipe.recipe_image_id]);

    return (
        <Container >
            <ImageArea backgroundImage={imageUrl}>
                <RecipeTitleWrapper>
                    <p>{recipe.recipe_name}</p>
                </RecipeTitleWrapper>
            </ImageArea>
                {/* <ButtonArea> */}
                    <EditBtn onClick={() => setShowRecipeEditor({open: true, recipeId: recipe.recipe_id})}>
                        Edit <FaRegEdit style={{marginLeft: 10}} size={15}/>
                    </EditBtn>
                {/* </ButtonArea> */}
        </Container>
    );
};

export default RecipeCard;