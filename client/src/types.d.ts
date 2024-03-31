export interface ColorsPalette {
    [key: string]: ColorsObj
}

export interface ColorsObj {
    background: string;
    textOnBackground: string;
    baseSurface: string;
    textOnSurface: string;
}

export interface StyleProps {
    colors: ColorsObj;
    theme: string
}

export interface dayDataInterface {
    mon: number | null;
    tue: number | null;
    wed: number | null;
    thur: number | null;
    fri: number | null;
    sat: number | null;
    sun: number | null;
}

export interface weekDataInterface {
    week_id: number | null;
    week_start: string | null;
    users_user_id: number | null;
    dayData: dayDataInterface
}

export interface recipeData {
    recipe_id: number | null;
    recipe_name: string;
    recipe_desc: string;
    recipe_image_id: number;
    recipe_ingredients: string;
    recipe_method: string;
    users_user_id: number;
}

export interface showRecipeEditorInterface {
    open: boolean;
    recipeId: number | null;
}