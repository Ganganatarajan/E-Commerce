import { configureStore } from "@reduxjs/toolkit";
import Permission from "./Permission.slice";

export const store=configureStore({
    reducer:{
        permission:Permission
        
    }
})