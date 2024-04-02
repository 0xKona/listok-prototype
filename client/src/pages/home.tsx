import React, { useContext, useState } from "react";
import Header from "../components/header";
import styled from "styled-components";
import DayCard from "../components/day-card";
import WeekNavigator from "../components/week-navigator";
import RecipeLibrary from "../components/recipe-library/recipe-library";
import ShoppingList from "../components/shopping-list/shopping-list";
import RecipeEditor from "../components/recipe-editor/recipe-editor";
import { WeekContext } from "../context/week-context";
import { DragDropContext } from "react-beautiful-dnd";
import { showRecipeEditorInterface } from "../types";

const Wrapper = styled.div`
    max-width: 100vw;
`
const DayContainer = styled.div`
    display:flex;
    justify-content: space-evenly;
    overflow-x: scroll;
    @media (width <= 1190px) {
        justify-content: flex-start;
    }
`
const RecipeListContainer = styled.div`
    display: flex;
    min-height: 60%;
    max-width: 100%;
    @media (width <= 900px) {
        flex-direction: column;
    }
`

const HomePage = (): JSX.Element => {
    const { weekData, setWeekData } = useContext(WeekContext)
    const [showRecipeEditor, setShowRecipeEditor] = useState<showRecipeEditorInterface>({open: false, recipeId: null});
    
    const onDragEnd = async(result: any) => {

        const { destination, source, draggableId } = result;

        if (!destination) return;

        const newData = {...weekData}
        newData.dayData[destination.droppableId] = Number(draggableId)

        try {
            const response = await fetch(`/api/updateWeek`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
    
            if (response.ok) {
                setWeekData(newData)
            } else {
                console.error('Failed to update week');
            }
        } catch (error) {
            console.error('Error updating week:', error);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
                <Wrapper>
                <Header />
                {showRecipeEditor.open ?
                    <RecipeEditor recipeId={showRecipeEditor.recipeId} setShowRecipeEditor={setShowRecipeEditor}/>
                :
                    <>
                        <WeekNavigator />
                        <DayContainer>
                            {
                                Object.keys(weekData.dayData).map((weekday: any) =>(
                                    <DayCard key={weekday} day={weekday}/>
                                ))
                            }
                        </DayContainer>
                        <RecipeListContainer>
                            <RecipeLibrary setShowRecipeEditor={setShowRecipeEditor}/>
                            <ShoppingList />
                        </RecipeListContainer>
                    </>
                }
        </Wrapper>
            </DragDropContext>
    )

}

export default HomePage