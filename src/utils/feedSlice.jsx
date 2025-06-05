import { createSlice } from "@reduxjs/toolkit"
import { act } from "react"

const feedSlice= createSlice({
    name:'feed',
    initialState:[],
    reducers:{
        addFeed:(state,action)=>{
            return action.payload
        }
    }
})

export const{addFeed}= feedSlice.actions
export default feedSlice.reducer