import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import feedReducer from "./FeedSlice";
import connectionsReducer from "./ConnectionSlice";
import requestsReducer from "./RequestsSlice";
const store = configureStore({
  reducer: {
    user: UserReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

export default store;
