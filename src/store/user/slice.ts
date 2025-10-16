import type { IUser } from "@/type/IUser";
import { createSlice } from "@reduxjs/toolkit";
import { getAllUserTask, getUser } from "./async";

interface IUserState {
  users: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: IUserState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getAllUserTask.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getAllUserTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUserTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
