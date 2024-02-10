import React from "react";
import Header from "../components/header";
import styled from "styled-components";
import DayCard from "../components/day-card";
import WeekNavigator from "../components/week-navigator";
import RecipeLibrary from "../components/recipe-library";
import ShoppingList from "../components/shopping-list";

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

    const days = ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun']

    return (
        <>
            <Header />
            <WeekNavigator />
            <Testdaycontainer>
            {
                days.map(weekday =>(
                    <DayCard key={weekday} day={weekday}/>
                ))
            }
            </Testdaycontainer>
            <RecipeListContainer>
                <RecipeLibrary />
                <ShoppingList />
            </RecipeListContainer>
        </>
    )

}

export default HomePage