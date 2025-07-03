import { createSlice } from "@reduxjs/toolkit";

const connectionsSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    setConnections: (state, action) => action.payload,
    clearConnections: () => [],
  },
});

export const { setConnections, clearConnections } = connectionsSlice.actions;
export default connectionsSlice.reducer;
