import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice.jsx"
import feedReducer from './feedSlice.jsx'
import connectionsReducer from './connectionSlice.jsx'
import requestReducer from './requestSlice.jsx'

const appStore = configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        connections:connectionsReducer,
        request:requestReducer
    }
})
export default appStore