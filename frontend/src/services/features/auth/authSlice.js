import { createAsyncThunkWithHandler } from "../../api/apiHandler";
import { createSlice } from "@reduxjs/toolkit";
import authService from "./authService";
import Cookies from "js-cookie";

const token = Cookies.get("Tfy_access_token");

const initialState = {
  isLoading: false,
  message: "",
  isSuccess: false,
  isError: false,
  token: token ? token : null,
};

export const signUp = createAsyncThunkWithHandler(
  "auth/signUp",
  async (data, _) => {
    return await authService.sign_up(data);
  }
);

export const logout = createAsyncThunkWithHandler("auth/logout", async () => {
  return authService.logout();
});

export const login = createAsyncThunkWithHandler(
  "auth/login",
  async (data, _) => {
    return await authService.login(data);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    resetToken: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })

      //login case
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })

      //logout case
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogoutSuccess = true;
        state.message = action.payload?.message || "Logout Successful";
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
        state.isLogoutSuccess = false;
      });

    //forgetPassword case
    //   .addCase(forgetPassword.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(forgetPassword.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = false;
    //     state.isSuccess = true;
    //     state.message = action.payload.result.message;
    //   })
    //   .addCase(forgetPassword.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload.message;
    //     state.isSuccess = false;
    //   })

    //   //resetPassword case
    //   .addCase(resetPassword.pending, (state, _) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(resetPassword.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = false;
    //     state.isSuccess = true;
    //     state.message = action.payload.result.message;
    //   })
    //   .addCase(resetPassword.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload.message;
    //     state.isSuccess = false;
    //   });
  },
});

export const { reset, resetToken } = authSlice.actions;
export default authSlice.reducer;
