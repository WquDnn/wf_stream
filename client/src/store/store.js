import { configureStore } from "@reduxjs/toolkit"
import { logger  } from "redux-logger"
import  general  from "./generalReducer"
import api from "./APIReducer"
import theme from "./themeReducer"
export default configureStore({
    reducer: {
       general,
       api,
       theme
    },
    middleware: (def) => def().concat(logger)
})  