import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../services/features/auth/authSlice.js";
import taskSlice from "../services/features/tasks/taskSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    tasks: taskSlice,
  },

  devTools: true,
});
