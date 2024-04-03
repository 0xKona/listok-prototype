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

//TODO: Known bug: weekday recipes do not load on first instance of logging in, must reload

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 100vw;
    height: 100vh; /* Fill the full viewport height */
    overflow: hidden; /* Prevent scrolling on the wrapper */
    @media (max-height: 1200px) {
        height: fit-content;
    }
`;

const BodyWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* Make BodyWrapper take the remaining space */
    overflow: hidden; /* Avoid scroll inside BodyWrapper */
`;

const DayContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    overflow-x: scroll;
    min-height: fit-content;
    margin-bottom: 20px;
    @media (max-width: 1190px) {
        justify-content: flex-start;
    }
`;

const RecipeListContainer = styled.div`
    display: flex;
    flex-grow: 1; /* Make RecipeListContainer expand to fill the available space */
    max-width: 100%;
    overflow-y: auto; /* Allow scrolling within RecipeListContainer */
    @media (max-width: 900px) {
        flex-direction: column;
    }
`;

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
                    <BodyWrapper>
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
                    </BodyWrapper>
                }
        </Wrapper>
            </DragDropContext>
    )

}

export default HomePage