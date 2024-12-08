import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface messages {
    messages: {party:string, messages: string[]}[],
    error: any
}

const initialState: messages = {
    messages: [{ party: "", messages: [] }],
    error: ""
}

export const fetchMessages = createAsyncThunk('messages/fetchMessages', () => {
    return axios.get('http://localhost:5000/messages')
    .then(result => {
        return result.data
    })
    .catch(() => {throw "something went wrong"})
})


const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchMessages.fulfilled, (state, action) => {
            state.messages = action.payload
        })
        builder.addCase(fetchMessages.rejected, (state, action) => {
            state.error = action.error.message
        })
    }
})

export default messagesSlice.reducer