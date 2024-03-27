import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { ThemeProvider } from './context/theme-context'
import { UserContextProvider } from './context/user.context'
import { StyleSheetManager } from 'styled-components'
import isPropValid from '@emotion/is-prop-valid'
import { WeekContextProvider } from './context/week-context'

const root = createRoot(document.getElementById('root')!)
root.render(
    <StyleSheetManager shouldForwardProp={(validName) => isPropValid(validName)}>
        <UserContextProvider>
            <ThemeProvider>
                <WeekContextProvider>
                    <App />
                </WeekContextProvider>
            </ThemeProvider>
        </UserContextProvider>
    </StyleSheetManager>
)
