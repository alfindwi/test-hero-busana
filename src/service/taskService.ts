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

export const getTaskById = async (id: number) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
      include: {
        logs: true,
        assignee: {
          select: {
            name: true,
            role: true,
          },
        },
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

export const getTaskSummary = async () => {
  try {
    const pending = await prisma.task.count({
      where: {
        status: "Pending",
      },
    });

    const inProgress = await prisma.task.count({
      where: {
        status: "InProgress",
      },
    });

    const completed = await prisma.task.count({
      where: {
        status: "Completed",
      },
    });

    const chartData = [
      { status: "Pending", total: pending, fill: "#EF4444" },
      { status: "InProgress", total: inProgress, fill: "#FBBF24" },
      { status: "Completed", total: completed, fill: "#22C55E" },
    ];

    return chartData;
  } catch (error) {
    console.error("Task ById Error:", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};

export const createTask = async (data: CreateTaskDTO, userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
        role: "ProjectManager",
      },
    });

    if (!user) {
      throw new Error("Unauthorized: only ProjectManager can create task");
    }

    const assignee = await prisma.user.findUnique({
      where: {
        id: data.assignedTo,
      },
      select: {
        name: true,
        role: true,
      },
    });

    if (!assignee) {
      throw new Error("Assignee not found");
    }

    const task = await prisma.task.create({
      data: {
        name: data.name,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        assignedTo: data.assignedTo,
        status: data.status,
      },
    });

    return task;
  } catch (error) {
    console.error("Create Task Error:", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};

export const updateTask = async (id: number, data: UpdateTaskDTO) => {
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

export const deleteTask = async (id: number, userId: number) => {
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
    });

    if (!existingTask) {
      throw new Error("Task not found");
    }

    await prisma.task.delete({
      where: {
        id,
      },
    });

    return {
      message: "Task deleted successfully",
    };
  } catch (error) {
    console.error("delete Task Error:", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};
