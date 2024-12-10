import { createSlice } from "@reduxjs/toolkit";

interface messages {
    messages: {party:string, messages: string[]}[],
    error: any
}

const initialState: messages = {
    messages: [{ party: "", messages: [] }],
    error: ""
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers:{
        addMessages: (state, action) => {
            state.messages = action.payload
        }
    },
})

export const updateMessages = messagesSlice.actions.addMessages

export default messagesSlice.reducer