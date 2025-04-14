import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../services/features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },

  devTools: true,
});
