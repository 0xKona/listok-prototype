import React, { useContext, useEffect, useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { WeekContext } from "../context/week-context";
import axios from 'axios';

const CardContainer = styled.div`
    margin: 10px;
    height: 200px;
    width: 150px;
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 10px;
    background-color: white; // Feel free to adjust styling
`;

const DayCard = ({ day }: { day: string }): JSX.Element => {

    const {weekData, setWeekData} = useContext(WeekContext);
    const [recipe, setRecipe] = useState<any>(null);
    const [error, setError] = useState('');
    
    const fetchRecipeById = async () => {
        try {
            const response = await axios.get(`/api/recipe/${weekData.dayData[day]}`);
            setRecipe(response.data);
        } catch (err) {
            // Error handling
            setError('Failed to fetch recipe');
            console.error(err);
        }
    };

    const resetRecipe = async() => {
        const newData = {...weekData}
        newData.dayData[day] = null;
        
        try {
            const response = await axios.post('/api/updateWeek', newData, {
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
        if (weekData.dayData[day]) {
            fetchRecipeById();
        } else {
            setRecipe(null)
        }
    }, [weekData.dayData[day], weekData.week_id])

    return (
        <Droppable droppableId={day}>
            {(provided, snapshot) => (
                <CardContainer
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ backgroundColor: snapshot.isDraggingOver ? 'lightblue' : 'white' }}
                >
                    <p>{day}</p>
                    <p>{`Recipe: ${recipe && recipe.recipe_name}`}</p>
                    {/* This is where the dropped items will be shown */}
                    {provided.placeholder}

                    <div>
                        <button onClick={resetRecipe}>{`Remove recipe from ${day}`}</button>
                    </div>
                </CardContainer>
            )}
        </Droppable>
    );
};

export default DayCard;