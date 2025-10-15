import { Router } from "express";
import { authRouter } from "./authRouter";
import taskRouter from "./taskRouter";
import logsRouter from "./logsRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/task", taskRouter);
router.use("/logs", logsRouter);


export default router;
