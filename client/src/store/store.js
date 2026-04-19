import { configureStore } from "@reduxjs/toolkit"
import { logger  } from "redux-logger"
import  general  from "./generalReducer"
export default configureStore({
    reducer: {
       general
    },
    middleware: (def) => def().concat(logger)
})