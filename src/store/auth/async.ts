import { api } from "@/lib/api";
import type { IUser } from "@/type/IUser";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const loginAsync = createAsyncThunk<
  { token: string; user: IUser },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/auth/login", data);
    const { token, user } = res.data;

    Cookies.set("token", token);

    return { token, user };
  } catch (error: any) {
    const errorMessage =
      (error.response && error.response.data && error.response.data.message) ||
      "Login failed. Please check your email and password.";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const registerAsync = createAsyncThunk<void, any>(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      await api.post("/auth/register", data);
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
