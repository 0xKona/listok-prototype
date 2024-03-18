import React, { useState } from "react";
import Header from "../components/header";
import styled from "styled-components";
import DayCard from "../components/day-card";
import WeekNavigator from "../components/week-navigator";
import RecipeLibrary from "../components/recipe-library";
import ShoppingList from "../components/shopping-list";
import RecipeEditor from "../components/recipe-editor/recipe-editor";

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
    const [showRecipeEditor, setShowRecipeEditor] = useState(true)

    const days = ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun']

    return (
        <>
            <Header />
            {showRecipeEditor ?
                <RecipeEditor setShowRecipeEditor={setShowRecipeEditor}/>
            :
                <>
                    <WeekNavigator />
                    <Testdaycontainer>
                    {
                        days.map(weekday =>(
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
        </>
    )

}

export default HomePage