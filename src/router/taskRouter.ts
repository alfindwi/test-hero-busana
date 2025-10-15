import * as taskController from "../controller/taskController";
import { Router } from "express";
import { authentication } from "../middleware/authentication";

const taskRouter = Router();

taskRouter.get("/", taskController.getTasks);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.post("/", authentication,taskController.createTask);
taskRouter.put("/:id", taskController.updateTask);
taskRouter.delete("/:id", authentication,taskController.deleteTask);

export default taskRouter;