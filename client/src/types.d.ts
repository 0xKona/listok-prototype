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