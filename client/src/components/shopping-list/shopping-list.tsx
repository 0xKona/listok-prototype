import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/theme-context";
import { themesObject } from "../../context/themes";
import { StyleProps } from "../../types";
import { WeekContext } from "../../context/week-context";
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { LuRefreshCcw } from "react-icons/lu";
import ShoppingItem from "./shopping-item";

const Container = styled.div`
    max-width: 100%;
    flex-grow: 1;
    margin: 10px;
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
`
const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Ingredients = styled.div`
    padding: 10px;
    margin-top: 20px;
`

const ShoppingList = (): JSX.Element => {

    const [ingredients, setIngredients] = useState<any>()
    const {weekData} = useContext(WeekContext);
    const [loading, setLoading] = useState(false)
    console.log(JSON.stringify(ingredients))
    const getIngredients = async () => {
        try {
            setLoading(true)
            const recipeIds = Object.values(weekData.dayData).join(',');
    
            // Fetch the ingredients data
            const response = await axios.get(`/api/getIngredients?recipeIds=${recipeIds}&weekId=${weekData.week_id}`);
            setIngredients(response.data);
            setTimeout(() => setLoading(false), 1000)
        } catch (error) {
            console.log('Error fetching Ingredient List: ', error);
        }
    };

    useEffect(() => {
        getIngredients();
    }, [weekData]);

    return (
        <Container>
            <Title>
                <p>Shopping List</p>
                <LoadingButton
                    size="small"
                    onClick={getIngredients}
                    loading={loading}
                    variant="outlined"
                >
                    <LuRefreshCcw />
                </LoadingButton>
            </Title>
            <Ingredients>
                {ingredients?.map((ingredient: any, index: number) => (
                    <ShoppingItem key={index} ingredient={ingredient} ingredientIndex={index}/>
                ))
                }
            </Ingredients>

        </Container>
    )
}

export default ShoppingList