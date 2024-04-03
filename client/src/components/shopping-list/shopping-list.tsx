import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/theme-context";
import { themesObject } from "../../context/themes";
import { StyleProps } from "../../types";
import { WeekContext } from "../../context/week-context";
import axios from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import { LuRefreshCcw, LuPrinter } from "react-icons/lu";
import ShoppingItem from "./shopping-item";
import { Button } from "@mui/material";

interface Ingredient {
    ingredientName: string;
    quantity: number;
    unit: string;
    category: string;
    checked?: boolean;
}

const Container = styled.div`
    max-width: 100%;
    flex-grow: 1;
    margin: 10px;
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const IngredientsSection = styled.section`
    border: solid black 1px;
    border-radius: 5px;
    padding: 10px;
    margin: 10px 0;
`;
const BtnText = styled.p`
    margin-right: 10px;
`
const SectionTitle = styled.h3`
    margin-bottom: 10px;
    text-align: center;
`

const ShoppingList = (): JSX.Element => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const { weekData } = useContext(WeekContext);
    const [loading, setLoading] = useState<boolean>(false);

    const groupIngredientsByCategory = (ingredients: Ingredient[]) => {
        return ingredients.reduce((groups, ingredient) => {
            const { category } = ingredient;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(ingredient);
            return groups;
        }, {} as Record<string, Ingredient[]>);
    }

    const getIngredients = async () => {
        setLoading(true);
        try {
            const recipeIds = Object.values(weekData.dayData).join(',');
            const response = await axios.get(`/api/getIngredients?recipeIds=${recipeIds}&weekId=${weekData.week_id}`);
            setIngredients(response.data);
        } catch (error) {
            console.log('Error fetching Ingredient List: ', error);
        }
        setTimeout(() => setLoading(false), 500);
    };

    useEffect(() => {
        getIngredients();
    }, [weekData]);

    // Group ingredients by category
    const ingredientsByCategory = groupIngredientsByCategory(ingredients);

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
            <div className="printable">
            {Object.entries(ingredientsByCategory).map(([category, ingredients], categoryIndex) => (
                <IngredientsSection key={category}>
                    <SectionTitle>{category}</SectionTitle>
                    {ingredients.map((ingredient, index) => (
                        <ShoppingItem key={`${category}-${index}`} ingredient={ingredient} />
                    ))}
                </IngredientsSection>
            ))}
            </div>
            <Button style={{width: 'fit-content', alignSelf: 'flex-end', justifySelf: 'flex-end'}} variant="outlined"  onClick={() => window.print()}>
                <BtnText>Print Shopping List</BtnText> 
                <LuPrinter size={20}/>
            </Button>
        </Container>
    );
};

export default ShoppingList;