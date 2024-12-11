import { createSlice } from "@reduxjs/toolkit";

interface initMsg {
    receiver: string,
    sender: string,
    message: string,
}

const initialState: initMsg = {
    receiver: "", sender: "", message: ""
}

const initiateMsgSlice = createSlice({
    name: "intMsg",
    initialState,
    reducers: {
        setSender: (state, action) => {
            state.sender = action.payload
        },
        setReceiver: (state, action) => {
            state.receiver = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        }
    }
})

export const { setSender, setReceiver, setMessage } = initiateMsgSlice.actions

export type {initMsg}

export default initiateMsgSlice.reducer