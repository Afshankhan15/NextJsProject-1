import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react";

interface siteTable {
    energy: number | null,
    power: number | null,
    oil: number | null,
    wood: number | null,
    water: number | null,
}
const initialState: siteTable = {
    energy:null,
    power:null,
    oil:null,
    wood:null,
    water:null
}

const siteInfoSlice = createSlice({
    name: "siteInfoSlice",
    initialState,
    reducers: {
        setInitialValues: (state, action: PayloadAction<siteTable>) => {
            console.log("state",state)
            console.log("action payload",action.payload) // same object as backend
            return { ...state, ...action.payload }; // Update state with backend values --. update all fileds we have from backend
        },
        afshanEnergy: (state, action: PayloadAction<number>) => {
            console.log("energy state",state,action.payload)
            state.energy = action.payload
            // return { ...state, energy: action.payload }; // Using spread operator
        },
        PowerReducer: (state, action: PayloadAction<number>) => {
            state.power = action.payload
        },
        oilReducer: (state, action: PayloadAction<number>) => {
            state.oil = action.payload
        },
        woodReducer: (state, action: PayloadAction<number>) => {
            state.wood = action.payload
        },
        waterReducer: (state, action: PayloadAction<number>) => {
            state.water = action.payload
        }
    }

})

export const {setInitialValues,afshanEnergy,PowerReducer,oilReducer,woodReducer,waterReducer} = siteInfoSlice.actions // reducers
export default siteInfoSlice.reducer
