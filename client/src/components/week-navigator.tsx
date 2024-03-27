import React, { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/theme-context";
import { themesObject } from "../context/themes";
import { StyleProps } from "../types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { WeekContext } from "../context/week-context";
import { weekDateText } from "../utils/utils";

const Container = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Week = styled.p`
`
//TODO WeekNavigator is broke, sometimes only goes forward/back 6/8 days and causes mayhem
const WeekNavigator = (): JSX.Element => {

    const { weekData, setWeekData } = useContext(WeekContext)
    console.log(weekData)
    const changeWeek = (forward: boolean) => {
        // Convert weekData.week_start string to a Date object first
        const currentWeekStart = new Date(weekData.week_start);
        
        // Calculate the new week start date
        const newWeekStart = new Date(currentWeekStart.setDate(currentWeekStart.getDate() + (forward ? 7 : -7)));
    
        // Format the newWeekStart date back to a string in YYYY-MM-DD format
        const newWeekStartStr = newWeekStart.toISOString().split('T')[0];
    
        // Use setWeekData to update the week_start
        setWeekData((prevWeekData: any) => ({
            ...prevWeekData, // Spread the previous weekData to maintain other properties
            week_start: newWeekStartStr, // Update the week_start to the new value
        }));
    };
    

    return (
        <Container>
            <FaArrowLeft onClick={() => changeWeek(false)}/>
            <Week>
                {`Week Starting Monday ${weekDateText(weekData.week_start)}`}
            </Week>
            <FaArrowRight onClick={() => changeWeek(true)}/>
        </Container>
    )
}

export default WeekNavigator