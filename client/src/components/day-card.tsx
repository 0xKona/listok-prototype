import React from "react";
import styled from "styled-components";

const CardContainer = styled.div`
    margin: 10px;
    height: 200px;
    width: 150px;
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 10px;
`

const DayCard = ({day}: any): JSX.Element => {

    return (
        <CardContainer>
            <p>{day}</p>
        </CardContainer>
    )
}

export default DayCard