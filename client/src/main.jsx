
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router"
import { Provider } from "react-redux"
import store from "./store/store.js"

import {ThemeProvider} from "@mui/material"
import { lightTheme, darkTheme} from "./Styles/theme.js"

import {useSelector } from "react-redux"
import "./i18next.js"


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <Wrapper />
        </Provider>
    </BrowserRouter>,
)

function Wrapper() {
    let themeName = useSelector(state=>state.theme.theme)
    return (
        <ThemeProvider theme={themeName == "light" ? lightTheme: darkTheme}>
        <App />
        </ThemeProvider>
    )
}