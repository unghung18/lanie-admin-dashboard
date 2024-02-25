import { createSlice } from "@reduxjs/toolkit";

interface stateTypeProp {
    toggleCollapse: boolean;
}

const initialState: stateTypeProp = {
    toggleCollapse: false
};


const toggleCollapseSlice = createSlice({
    name: "toggleCollapse",
    initialState,
    reducers: {
        toggle(state) {
            state.toggleCollapse = !state.toggleCollapse
        }
    },
});

export const { toggle } = toggleCollapseSlice.actions;
export default toggleCollapseSlice.reducer;