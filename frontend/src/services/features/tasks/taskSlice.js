import { createAsyncThunkWithHandler } from "../../api/apiHandler";
import { createSlice } from "@reduxjs/toolkit";
import taskService from "./taskService";

const tasks = localStorage.getItem("Tfy_tasks");

const initialState = {
  isLoading: false,
  message: "",
  isSuccess: false,
  isError: false,
  isAddTaskLoading: false,
  isAddTaskSuccess: false,
  isEditTaskLoading: false,
  isEditTaskSuccess: false,
  isDeleteTaskLoading: false,
  isDeleteTaskSuccess: false,
  isCompleteTaskLoading: false,
  isCompleteTaskSuccess: false,
  tasks: tasks ? JSON.parse(tasks) : null,
};

export const getTasks = createAsyncThunkWithHandler(
  "task/getTasks",
  async () => {
    return await taskService.getTasks();
  }
);

export const addTask = createAsyncThunkWithHandler(
  "task/addTask",
  async (data, _) => {
    return await taskService.addTasks(data);
  }
);

export const editTask = createAsyncThunkWithHandler(
  "task/editTask",
  async (data, _) => {
    return await taskService.editTask(data);
  }
);

export const completeTask = createAsyncThunkWithHandler(
  "task/completeTask",
  async (data, _) => {
    return await taskService.completeTask(data);
  }
);

export const deleteTask = createAsyncThunkWithHandler(
  "task/deleteTask",
  async (data, _) => {
    return await taskService.deleteTask(data);
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isAddTaskSuccess = false;
      state.isAddTaskLoading = false;
      state.isEditTaskSuccess = false;
      state.isEditTaskLoading = false;
      state.isDeleteTaskSuccess = false;
      state.isDeleteTaskLoading = false;
      state.isCompleteTaskSuccess = false;
      state.isCompleteTaskLoading = false;
      state.message = "";
    },
    resetTasks: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.tasks = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.tasks = action.payload.data;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isSuccess = false;
      })

      //addTask case
      .addCase(addTask.pending, (state) => {
        state.isAddTaskLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isAddTaskLoading = false;
        state.isError = false;
        state.isAddTaskSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isAddTaskLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.isAddTaskSuccess = false;
      })

      //edit case
      .addCase(editTask.pending, (state) => {
        state.isEditTaskLoading = true;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        state.isEditTaskLoading = false;
        state.isError = false;
        state.isEditTaskSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(editTask.rejected, (state, action) => {
        state.isEditTaskLoading = false;
        state.message = action.payload;
        state.isEditTaskSuccess = false;
        state.isError = true;
      })

      // completeTask case
      .addCase(completeTask.pending, (state) => {
        state.isCompleteTaskLoading = true;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.isCompleteTaskLoading = false;
        state.isError = false;
        state.isCompleteTaskSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.isError = true;
        state.message = action.payload;
        state.isCompleteTaskSuccess = false;
        state.isCompleteTaskLoading = false;
      })

      //   deleteTask case
      .addCase(deleteTask.pending, (state) => {
        state.isDeleteTaskLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isDeleteTaskLoading = false;
        state.isError = false;
        state.isDeleteTaskSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isDeleteTaskLoading = false;
        state.message = action.payload;
        state.isDeleteTaskSuccess = false;
        state.isError = true;
      });
  },
});

export const { reset, resetTasks } = taskSlice.actions;
export default taskSlice.reducer;
