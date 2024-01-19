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