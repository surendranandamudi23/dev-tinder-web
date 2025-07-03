import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    setRequests: (state, action) => action.payload,
    clearRequests: () => [],
  },
});

export const { setRequests, clearRequests } = requestsSlice.actions;
export default requestsSlice.reducer;
