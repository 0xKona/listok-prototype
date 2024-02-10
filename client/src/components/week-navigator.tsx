import React from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/theme-context";
import { themesObject } from "../context/themes";
import { StyleProps } from "../types";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

const Container = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`
const Week = styled.p`
`

const WeekNavigator = (): JSX.Element => {

    return (
        <Container>
            <FaArrowLeft />
            <Week>
                Week Starting PlaceHolder!
            </Week>
            <FaArrowRight />
        </Container>
    )
}

export default WeekNavigator