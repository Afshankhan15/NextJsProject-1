import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface userTable {
    name: string
}

const initialState : userTable = {
    name: ''
}

const userTableSlice = createSlice({
    name: "userTable",
    initialState,
    reducers: {
        // reducer to store name value
        setUserTableName: (state, action: PayloadAction<string>) => {
            state.name = action.payload
        }
    }
})

export const {setUserTableName} = userTableSlice.actions
export default userTableSlice.reducer