import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    setFeed: (state, action) => action.payload,
    clearFeed: () => [],
  },
});

export const { setFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
