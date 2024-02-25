import { configureStore } from "@reduxjs/toolkit";
import toggleCollapseReducer from "./slices/toggleCollapseSlice";

export const store = configureStore({
    reducer: {
        toggleCollapse: toggleCollapseReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch