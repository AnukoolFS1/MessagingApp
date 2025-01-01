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
    activeUsers:string[]
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
    activeUsers:[]
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload.user;
            state.conversations = action.payload.conversations;
            state.activeUsers = action.payload.activeUsers
        },
        addActive: (state, action) => {
            state.activeUsers = [...state.activeUsers, action.payload]
        },
        removeActive: (state, action) => {
            state.activeUsers = state.activeUsers.filter((e:string) => e!==action.payload)
        }
    }
})

const [userReducer, userActionUpdate] = [userSlice.reducer, userSlice.actions.updateUser];
const {addActive, removeActive} = userSlice.actions
export { userReducer, userActionUpdate, initialState, addActive, removeActive}

export type {User}