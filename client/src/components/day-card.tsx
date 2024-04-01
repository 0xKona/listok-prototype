import React, { useContext, useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { WeekContext } from "../context/week-context";
import axios from 'axios';
import { recipeData } from "../types";
import { dataDayToDisplayText } from "../utils/utils";
import { FaRegTrashCan } from "react-icons/fa6";

const CardContainer = styled.div<{ backgroundImage?: string }>`
    margin: 10px;
    min-height: 200px;
    min-width: 150px;
    width: 14%;
    flex-grow: 1;
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.75);
    border-radius: 10px;
    background-color: white;
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
`;
const WeekDayCont = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 10px 10px 0 0;
    background-color: white;
`
const ResetButton = styled.button`
    width: 100%;
    padding: 5px;
    border: none;
    margin-top: auto;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
`
const RecipeName = styled.div`
    margin:  30px 10px;
    flex-grow: 1;
    background: rgba(255, 255, 255, 0.47);
    border-radius: 5px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`

interface Props {
    day: string;
}

const DayCard = ({ day }: Props): JSX.Element => {
    const {weekData, setWeekData} = useContext(WeekContext);
    const [recipe, setRecipe] = useState<recipeData | null>(null);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    
    const fetchRecipeById = async (): Promise<void> => {
        try {
            const response = await axios.get(`/api/recipe/${weekData.dayData[day]}`);
            setRecipe(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const resetRecipe = async(): Promise<void> => {
        const newData = {...weekData}
        newData.dayData[day] = null;
        
        try {
            await axios.post('/api/updateWeek', newData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setWeekData(newData)
        } catch (error) {
            console.error('Error updating week:', error);
        }
    }


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await fetch(`/api/image/${recipe?.recipe_image_id}`);
                const base64Image = await response.text();
                setImageUrl(`data:image/jpeg;base64,${base64Image}`);
            } catch (error) {
                console.error("Error fetching image:", error);
            }
        };

        if (recipe?.recipe_image_id) {
            fetchImage();
        }
    }, [recipe?.recipe_image_id]);

    useEffect(() => {
        if (weekData.dayData[day]) {
            fetchRecipeById();
        } else {
            setRecipe(null)
            setImageUrl(undefined)
        }
    }, [weekData.dayData[day], weekData.week_id])

    return (
        <Droppable droppableId={day}>
            {(provided, snapshot) => (
                <CardContainer
                    backgroundImage={imageUrl}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'white' }}
                >
                    <WeekDayCont>
                        <p>{dataDayToDisplayText(day)}</p>
                    </WeekDayCont>

                    <RecipeName>
                        <p>{recipe ? recipe.recipe_name : 'Drag a recipe here from your Recipe Library!'}</p>
                    </RecipeName>
                    
                    {provided.placeholder}

                    <ResetButton onClick={resetRecipe}>
                        <FaRegTrashCan size={20}/>
                    </ResetButton>
                  
                </CardContainer>
            )}
        </Droppable>
    );
};

export default DayCard;