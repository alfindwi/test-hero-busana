import { Router } from "express";
import * as logController from "../controller/logsController";

const logsRouter = Router();

logsRouter.get("/:id", logController.getTaskByid);

export default logsRouter;