import { Router } from "express";
import { authRouter } from "./authRouter";
import { taskRouter } from "./taskRouter";
import { logsRouter } from "./logsRouter";
import { userRouter } from "./userRouter";

const router = Router();

router.use("/auth", authRouter);
router.use("/task", taskRouter);
router.use("/logs", logsRouter);
router.use("/user", userRouter);

export default router;
