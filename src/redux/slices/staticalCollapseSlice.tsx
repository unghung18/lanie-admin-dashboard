import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  totalRevenue: 3898000,
  totalDayRevenue: 3198000,
  sale: 5,
  chart: 3898,
};

const staticalCollapseSlice = createSlice({
  name: "staticalCollapse",
  initialState,
  reducers: {
    change(state: any) {
      if (state.totalDayRevenue === 3198000) {
        state.totalRevenue = 4997000;
        state.totalDayRevenue = 4297000;
        state.sale = 7;
        state.chart = 4997;
      } else {
        state.totalRevenue = 3898000;
        state.totalDayRevenue = 3198000;
        state.sale = 5;
        state.chart = 3898;
      }
    },
  },
});

export const { change } = staticalCollapseSlice.actions;
export default staticalCollapseSlice.reducer;
