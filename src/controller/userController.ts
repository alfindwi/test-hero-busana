import { Request, Response } from "express";
import * as userService from "../service/userService";

export const getUser = async (req: Request, res: Response) => {
  try {
    const data = await userService.getUser();

    res.status(200).json(data);
  } catch (error) {
    console.log("User Error ", error);
  }
};

export const getAllUserTask = async (req: Request, res: Response) => {
  try {
    const data = await userService.getAllUserTask();

    res.status(200).json(data);
  } catch (error) {
    console.log("User Error ", error);
  }
};