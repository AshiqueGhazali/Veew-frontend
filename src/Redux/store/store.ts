import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userAuthSlice from '../slice/userAuthSlice';


export type RootState = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    user:userAuthSlice
})


const store = configureStore({
    reducer:rootReducer
})

export default store