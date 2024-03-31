import React, { useContext, useState } from "react";
import Header from "../components/header";
import styled from "styled-components";
import DayCard from "../components/day-card";
import WeekNavigator from "../components/week-navigator";
import RecipeLibrary from "../components/recipe-library/recipe-library";
import ShoppingList from "../components/shopping-list";
import RecipeEditor from "../components/recipe-editor/recipe-editor";
import { WeekContext } from "../context/week-context";
import { DragDropContext } from "react-beautiful-dnd";
import { showRecipeEditorInterface } from "../types";

const Testdaycontainer = styled.div`
    display:flex;
    justify-content: space-around;
`
const RecipeListContainer = styled.div`
    margin: 10px 15px;
    display: flex;
    justify-content: space-between;
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
            <Header />
            {showRecipeEditor.open ?
                <RecipeEditor recipeId={showRecipeEditor.recipeId} setShowRecipeEditor={setShowRecipeEditor}/>
            :
                <>
                    <WeekNavigator />
                    <Testdaycontainer>
                    {
                        Object.keys(weekData.dayData).map((weekday: any) =>(
                            <DayCard key={weekday} day={weekday}/>
                        ))
                    }
                    </Testdaycontainer>
                    <RecipeListContainer>
                        <RecipeLibrary setShowRecipeEditor={setShowRecipeEditor}/>
                        <ShoppingList />
                    </RecipeListContainer>
                </>
            }
        </DragDropContext>
    )

}

export default HomePage