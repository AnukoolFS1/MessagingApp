import { createSlice } from "@reduxjs/toolkit";

interface messages {
    messages: {party:string, messages: string[]}[],
    error: any,
    currentMessages:any
}

const initialState: messages = {
    messages: [{ party: "", messages: [] }],
    error: "",
    currentMessages: {}
}

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers:{
        addMessages: (state, action) => {
            state.messages = action.payload
        },
        currentMessages: (state, action) => {
            state.messages.forEach((msg:{party:string, messages: string[]}) => {
                console.log(msg.party,'----', action.payload)
                if(msg.party === action.payload){
                    state.currentMessages = msg
                }
            })
        }
    },
})

export const updateMessages = messagesSlice.actions.addMessages
export const setCurrentMsgs = messagesSlice.actions.currentMessages

export default messagesSlice.reducer