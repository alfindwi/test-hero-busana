import * as taskController from "../controller/taskController";
import { Router } from "express";
import { authentication } from "../middleware/authentication";

export const taskRouter = Router();

taskRouter.get("/", taskController.getTasks);
taskRouter.get("/summary", taskController.getTaskSummary);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.post("/", authentication,taskController.createTask);
taskRouter.put("/:id", taskController.updateTask);
taskRouter.delete("/:id", authentication,taskController.deleteTask);
