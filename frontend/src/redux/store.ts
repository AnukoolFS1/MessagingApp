import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import messagesReducers from "./messagesSlice"
import intMsgReducer from './initiateMessage'

const store = configureStore({
    reducer:{
        users: userReducer,
        messages: messagesReducers,
        intMessage: intMsgReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store