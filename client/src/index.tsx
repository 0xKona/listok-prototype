import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './app'
import { ThemeProvider } from './context/theme-context'

const root = createRoot(document.getElementById('root')!)
root.render(
    <ThemeProvider>
        <App />
    </ThemeProvider>
)
