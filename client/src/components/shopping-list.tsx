import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../context/theme-context";
import { themesObject } from "../context/themes";
import { StyleProps } from "../types";
import { WeekContext } from "../context/week-context";
import axios from 'axios';

const Container = styled.div`
    width: 35%;
    flex-grow: 1;
    margin: 10px;
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 10px;
`

const ShoppingList = (): JSX.Element => {

    const [ingredients, setIngredients] = useState<any>()
    const {weekData} = useContext(WeekContext);
  
    const getIngredients = async () => {
        try {
            const weekId = weekData.week_id;
            const userId = weekData.users_user_id;
            const recipeIds = Object.values(weekData.dayData).join(',');
    
            // Fetch the ingredients data
            const response = await axios.get(`/api/getIngredients?recipeIds=${recipeIds}`);
            setIngredients(response.data);
        } catch (error) {
            console.log('Error fetching Ingredient List: ', error);
        }
    };

    useEffect(() => {
        getIngredients();
    }, [weekData]);

    return (
        <Container>
            <p>Shopping List</p>
            <button onClick={getIngredients}>Refresh</button>
            {ingredients?.map((ingredient: any, index: number) => (
                <p key={index}>{`${ingredient.quantity} ${ingredient.ingredientName}`}</p>
            ))

            }
        </Container>
    )
}

export default ShoppingList