import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import messagesReducers from "./messagesSlice"

const store = configureStore({
    reducer:{
        users: userReducer,
        messages: messagesReducers
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store