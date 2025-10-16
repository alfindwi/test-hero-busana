import { Router } from "express";
import * as logController from "../controller/logsController";

export const logsRouter = Router();

logsRouter.get("/:id", logController.getTaskByid);
