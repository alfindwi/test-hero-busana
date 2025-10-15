import { CreateTaskDTO, UpdateTaskDTO } from "../dto/taskDTO";
import { prisma } from "../libs/prisma";

export const getTasks = async () => {
  try {
    const task = await prisma.task.findMany({
      include: {
        logs: true,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  } catch (error) {
    console.error("Task Error:", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};

export const getTaskById = async (id: string) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        logs: true,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  } catch (error) {
    console.error("Task ById Error:", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};

export const createTask = async (data: CreateTaskDTO, userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        role: "ProjectManager"
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const task = await prisma.task.create({
      data,
    });

    return task;
  } catch (error) {
    console.error("Create Task Error:", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};

export const updateTask = async (id: string, data: UpdateTaskDTO) => {
  try {
    const existingTask = await prisma.task.findUnique({
      where: {
        id,
      },
    });

    if (!existingTask) {
      throw new Error("Task not found");
    }

    if (data.status && data.status !== existingTask.status) {
      await prisma.taskLogs.create({
        data: {
          taskId: id,
          previous_status: existingTask.status,
          new_status: data.status,
        },
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id,
      },
      data: {
        ...data,
        updated_at: new Date(),
      },
      include: {
        logs: true,
      },
    });

    return updatedTask;
  } catch (error) {
    console.error("update Task Error:", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};

export const deleteTask = async (id: string, userId : string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const existingTask = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    if (!existingTask) {
      throw new Error("Task not found");
    }

    const deletedTask = await prisma.task.delete({
      where: {
        id,
      },
    });

    return deletedTask;
  } catch (error) {
    console.error("delete Task Error:", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};
