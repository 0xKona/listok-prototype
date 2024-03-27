import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "../../context/theme-context";
import { themesObject } from "../../context/themes";
import { StyleProps } from "../../types";
import { Button } from "@mui/material";
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UserContext } from "../../context/user.context";
import RecipeCard from "./recipe-card";
import { Draggable, Droppable } from 'react-beautiful-dnd' 

// TODO Known bug: if recipe libray width is longer than total amount of recipes 
// then user cannot scroll and is unable to load more

const Container = styled.div`
    width: 100%;
    height: 400px;
    box-shadow: 0px 0px 5px 4px rgba(0,0,0,0.75);
    border-radius: 10px;
    padding: 10px;
`
const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: orange; */
    padding: 10px 0px;
`
const RecipeListContainer = styled.div`
    height: 300px;
    overflow: auto;
    display: flex;
    
`;

//TODO : types
const RecipeLibrary = ({ setShowRecipeEditor }: any): JSX.Element => {
    const [recipes, setRecipes] = useState<any>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 10; // Number of recipes to load per page

    const {userObj} = useContext(UserContext)
    console.log(userObj)
    useEffect(() => {
        fetchRecipes();
    }, [userObj.userInfo.listokId, page]); // Fetch recipes when userId changes

    const fetchRecipes = async () => {
        try {
            const response = await axios.get(`/api/recipes/${userObj.userInfo.listokId}?page=${page}&limit=${limit}`);
            setRecipes((recipes: any) => [...recipes, ...response.data]);
            if (response.data.length < limit) {
                setHasMore(false); // No more recipes to load
            }
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const fetchMoreRecipes = () => {
        setPage(page => page + 1); // Increment page to fetch next set of recipes
        fetchRecipes();
    };


    return (
        <Container>
            <Header>
                <p>Recipe Library</p>
                <Button variant="outlined" onClick={() => setShowRecipeEditor(true)}>New Recipe</Button>
            </Header>
            <Droppable droppableId="recipeListDroppable" isDropDisabled={true}>
                {(provided, snapshot) => (
                    <RecipeListContainer
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        id="RecipeListContainer"
                    >
                        <InfiniteScroll
                            style={{ 
                                display: 'flex', 
                                flexWrap: 'wrap', 
                                gap: '10px', 
                                justifyContent: 'flex-start',
                                padding: '10px'
                            }}
                            scrollableTarget="RecipeListContainer"
                            dataLength={recipes.length}
                            next={fetchMoreRecipes}
                            hasMore={hasMore}
                            loader={<h4>Loading...</h4>}
                            endMessage={
                                <p style={{ textAlign: 'center' }}>
                                    <b>You have seen all recipes</b>
                                </p>
                            }
                        >
                            {recipes.map((recipe: any, index: number) => (
                                <Draggable key={recipe.recipe_id} draggableId={`${recipe.recipe_id}`} index={index}>
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{...provided.draggableProps.style}}
                                        >
                                            {/* Your RecipeCard component */}
                                            <RecipeCard key={recipe.recipe_id} recipe={recipe} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </InfiniteScroll>
                    </RecipeListContainer>
                )}
            </Droppable>
        </Container>
    );
}

export default RecipeLibrary