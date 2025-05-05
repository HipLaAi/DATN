import { configureStore } from "@reduxjs/toolkit";
import reloadReducer from "../features/reloadSlice";

const store = configureStore({
    reducer: {
        reload: reloadReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;