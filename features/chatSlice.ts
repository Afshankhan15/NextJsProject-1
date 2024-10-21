
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  message : string
}
const initialState : Chat = {
  message: ''
}


const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // 1st reducer to store message
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    // 2nd reducer to print "Hello afshan welcome"
    printMessage: (state) => {
      state.message = "Hello afshan welcome"
    }
  }
})


export const {setMessage, printMessage} =chatSlice.actions
export default chatSlice.reducer