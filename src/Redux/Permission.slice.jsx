import { createSlice } from "@reduxjs/toolkit";

const Permission=createSlice({
    name:"permission",
    initialState:{
        permission:{}
    },
    reducers:{
        setPermission:(state,action)=>{
            state=action.payload
        },
        getParticularPermission:(state,action)=>{
            return state[action.payload]
        },
        getUserProfile:(state,action)=>{
            return state
        }
    }
})


export const {setPermission,getParticularPermission,getUserProfile}=Permission.actions

export default Permission.reducer