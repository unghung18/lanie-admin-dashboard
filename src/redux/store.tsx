import { configureStore } from "@reduxjs/toolkit";
import staticalCollapseReducer from "./slices/staticalCollapseSlice";
import toggleCollapseReducer from "./slices/toggleCollapseSlice";

export const store = configureStore({
  reducer: {
    toggleCollapse: toggleCollapseReducer,
    staticalCollapse: staticalCollapseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
