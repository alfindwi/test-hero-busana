import { api } from "@/lib/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const res = await api.get("/user");

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getAllUserTask = createAsyncThunk(
  "user/getAllUserTask",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/user/task");

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)