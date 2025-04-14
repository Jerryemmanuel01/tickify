import { createAsyncThunk } from "@reduxjs/toolkit";

// Ensure `Returned` can be any type, but provide a more specific type for the result
export const createAsyncThunkWithHandler = (name, thunkFunction) =>
  createAsyncThunk(name, async (arg, thunkAPI) => {
    try {
      const result = await thunkFunction(arg, thunkAPI);

      // Check if result has a `message` property
      if (result && typeof result === "object" && "message" in result) {
        if (result.message === false) {
          return thunkAPI.rejectWithValue(result.message);
        }
      }

      return result;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          (error.response.data.message || error.response.data.error)) ||
        error.message ||
        error.toString();

      // Check if the error code is 401
      if (error.response && error.response.status === 401) {
      }

      return thunkAPI.rejectWithValue(message);
    }
  });
