import { Request, Response } from "express";
import * as taskService from "../service/taskService";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks();

    res.status(200).json(tasks);
  } catch (error) {
    console.log("Get Task Error ", error);
    const message = (error as Error).message;

    res.status(500).json({ message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await taskService.getTaskById(Number(id));

    res.status(200).json(task);
  } catch (error) {
    console.log("Get Task ById Error ", error);
    const message = (error as Error).message;

    res.status(500).json({ message });
  }
};

export const getTaskSummary = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTaskSummary();

    res.status(200).json(tasks);
  } catch (error) {
    console.log("Get Task Summary Error ", error);
    const message = (error as Error).message;

    res.status(500).json({ message });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = res.locals.user.id;
    const task = await taskService.createTask(data, userId);

    res.status(201).json(task);
  } catch (error) {
    console.log("Create Task Error ", error);
    const message = (error as Error).message;

    res.status(500).json({ message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const task = await taskService.updateTask(Number(id), data);

    res.status(200).json(task);
  } catch (error) {
    console.log("Update Task Error ", error);
    const message = (error as Error).message;

    res.status(500).json({ message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = res.locals.user.id;
    const task = await taskService.deleteTask(Number(id), userId);

    res.status(200).json(task);
  } catch (error) {
    console.log("Delete Task Error ", error);
    const message = (error as Error).message;

    res.status(500).json({ message });
  }
};
