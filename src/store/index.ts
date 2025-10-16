import { useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import taskSlice from "./task/slice";
import userSlice from "./user/slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    task: taskSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
