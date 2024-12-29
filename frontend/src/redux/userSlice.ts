import { createSlice } from "@reduxjs/toolkit";

interface User {
    id: string,
    name: string,
    email: string,
    phone: string,
    role: string,
    isOnline: boolean
}

interface IS {
    user: User,
    conversations:any,
    // messages:any
}

const initialState: IS = {
    user: {
        id: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        isOnline: false
    },
    conversations :[],
    // messages: []
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload.user;
            state.conversations = action.payload.conversation;
            // state.messages = action.payload.messages
        }
    }
})

const [userReducer, userActionUpdate] = [userSlice.reducer, userSlice.actions.updateUser];

export { userReducer, userActionUpdate, initialState}

export type {User}