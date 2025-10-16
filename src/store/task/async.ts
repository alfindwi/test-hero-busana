import { api } from "@/lib/api";
import type { CreateTaskDTO, UpdateTaskDTO } from "@/type/ITask";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const getTask = createAsyncThunk("task/getTask", async (_, thunkAPI) => {
  try {
    const res = await api.get("/task", {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getTaskById = createAsyncThunk(
  "task/getTaskById",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.get(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createTask = createAsyncThunk(
  "task/createTask",
  async (data: CreateTaskDTO, thunkAPI) => {
    try {
      const res = await api.post("/task", data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return res.data;
    } catch (error: any) {
      const message =
        error.response?.data?.error || error.message || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateTask = createAsyncThunk(
  "task/updateTask",
  async (data: { id: number; data: Partial<UpdateTaskDTO> }, thunkAPI) => {
    try {
      const res = await api.put(`/task/${data.id}`, data.data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return res.data;
    } catch (error: any) {
      const message =
        error.response?.data?.error || error.message || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getTaskSummary = createAsyncThunk(
  "task/getTaskSummary",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/task/summary");

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)


export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.delete(`/task/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      return res.data;
    } catch (error: any) {
      const message =
        error.response?.data?.error || error.message || "Terjadi kesalahan";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
