import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../Component/Reducer";

export default configureStore({
  reducer: {
    login: loginSlice,
  },
});