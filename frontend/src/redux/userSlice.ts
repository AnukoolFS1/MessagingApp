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
    user: User
}

const initialState: IS = {
    user: {
        id: "",
        name: "",
        email: "",
        phone: "",
        role: "",
        isOnline: false
    }
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        updateUser: (state, action) => {
            state.user = action.payload
        }
    }
})

const [userReducer, userActionUpdate] = [userSlice.reducer, userSlice.actions.updateUser];

export { userReducer, userActionUpdate }
