import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { ThemeProvider } from './context/theme-context'
import { UserContextProvider } from './context/user.context'

const root = createRoot(document.getElementById('root')!)
root.render(
    <UserContextProvider>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </UserContextProvider>
)
