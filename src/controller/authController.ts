import { Request, Response } from "express";
import * as authService from "../service/authService";

export const login = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const token = await authService.login(data);

    res.status(201).json(token);
  } catch (error) {
    console.log("Login Error ", error);
    const message = (error as Error).message;

    res.status(500).json({ message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await authService.register(data);

    return res.status(201).json({
      user,
    });
  } catch (error) {
    const message = (error as Error).message;
    return res.status(500).json({
      message,
    });
  }
};
