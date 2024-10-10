import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userAuthSlice from '../slice/userAuthSlice';
import adminAuthSlice from '../slice/adminAuthSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const persistConfig = {
    key: 'root', 
    storage, 
    whitelist: ['user', 'admin'], 
};


const rootReducer = combineReducers({
    user: userAuthSlice,
    admin: adminAuthSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/PAUSE',
                    'persist/PURGE',
                    'persist/FLUSH',
                    'persist/REGISTER',
                ],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
