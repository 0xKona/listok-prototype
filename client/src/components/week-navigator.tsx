import React, { useContext } from "react";
import styled from "styled-components";
import { WeekContext } from "../context/week-context";
import { weekDateText } from "../utils/utils";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Adjust the import based on your version
import { addWeeks, format } from 'date-fns';

const Container = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const Week = styled.p`
`;

const ChangeWeekButton = styled.button`
    padding: 10px;
    border-radius: 100%;
    border: none;
    cursor: pointer;
`;

const WeekNavigator = (): JSX.Element => {
    const { weekData, setWeekData } = useContext(WeekContext);

    const changeWeek = (forward: boolean): void => {
        // Convert weekData.week_start string to a Date object
        const currentWeekStart = new Date(weekData.week_start);

        // Calculate the new week start date
        const newWeekStart = addWeeks(currentWeekStart, forward ? 1 : -1);

        // Format the newWeekStart date back to a string in YYYY-MM-DD format
        const newWeekStartStr = format(newWeekStart, 'yyyy-MM-dd');

        // Use setWeekData to update the week_start
        setWeekData((prevWeekData: any) => ({
            ...prevWeekData, // Spread the previous weekData to maintain other properties
            week_start: newWeekStartStr, // Update the week_start to the new value
        }));
    };

    return (
        <Container>
            <ChangeWeekButton onClick={() => changeWeek(false)}>
                <FaArrowLeft />
            </ChangeWeekButton>
            <Week>
                {`Week Starting Monday ${weekDateText(weekData.week_start)}`}
            </Week>
            <ChangeWeekButton onClick={() => changeWeek(true)}>
                <FaArrowRight />
            </ChangeWeekButton>
        </Container>
    );
};

export default WeekNavigator;
