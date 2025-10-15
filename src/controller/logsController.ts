import { Request, Response } from "express";
import * as logService from "../service/logsService";

export const getTaskByid = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const logs = await logService.getLogsById(Number(id));

    res.status(200).json(logs);
  } catch (error) {
    console.log("Logs By Id Error ", error);
    const message = (error as Error).message;

    res.status(500).json({ message });
  }
};
