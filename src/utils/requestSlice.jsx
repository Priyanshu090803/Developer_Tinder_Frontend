import { createSlice } from "@reduxjs/toolkit"

const requestSlice = createSlice({
    name:"request",
    initialState:[],
    reducers:{
        addRequest:(state,action)=>{
            return action.payload
        },
        removeRequest:(state,action)=>{
            const newArr = state.filter((req)=>req._id !== action.payload)  // (!== JISME TRUE HOGA TO WO REMOVE NAHI HOGA AND JISME FALSE HOGA WO RMOVE HOGA)
            return newArr
        }
    }
})

export const {addRequest,removeRequest} = requestSlice.actions
export default requestSlice.reducer