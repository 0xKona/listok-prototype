import React, { createContext, useState } from 'react';
import { themesObject } from './themes';

interface ThemeContextInterface {
    theme: string;
    themeOptions: string[];
    setNewTheme: any;
}

export const ThemeContext = createContext<ThemeContextInterface>({
    theme: 'light',
    themeOptions: Object.keys(themesObject),
    setNewTheme: () => {}
});

export const ThemeProvider = (props: any): JSX.Element => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') ?? 'light'
    );

    const themeOptions = Object.keys(themesObject);

    const setThemeWithLocalStorage = (newTheme: string) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const setNewTheme = (theme: string) => setThemeWithLocalStorage(theme);

    return (
        <ThemeContext.Provider value={{ theme, themeOptions, setNewTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}