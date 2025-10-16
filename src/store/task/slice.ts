import type { ITask } from "@/type/ITask";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  createTask,
  deleteTask,
  getTask,
  getTaskById,
  getTaskSummary,
  updateTask,
} from "./async";

interface ITaskState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
}

const initalState: ITaskState = {
  tasks: [] as ITask[],
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState: initalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(getTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(getTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getTaskSummary.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(getTaskSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.loading = false;
      })

      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder

      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<ITask>) => {
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default taskSlice.reducer;
