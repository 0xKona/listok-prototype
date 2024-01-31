import React from "react";
import Header from "../components/header";
import styled from "styled-components";
import DayCard from "../components/day-card";

const Testdaycontainer = styled.div`
    display:flex;
    justify-content: space-around;
`

const HomePage = (): JSX.Element => {

    const days = ['mon', 'tue', 'wed', 'thurs', 'fri', 'sat', 'sun']

    return (
        <>
            <Header />
            <Testdaycontainer>
            {
                days.map(weekday =>(
                    <DayCard key={weekday} day={weekday}/>
                ))
            }
            </Testdaycontainer>
        </>
    )

}

export default HomePage