import { Router } from "express";
import * as userController from "../controller/userController";

export const userRouter = Router();

userRouter.get("/", userController.getUser);
userRouter.get("/task", userController.getAllUserTask);
