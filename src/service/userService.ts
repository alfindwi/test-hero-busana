import { prisma } from "../libs/prisma";

export const getUser = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: "ProjectManager",
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    if (!users || users.length === 0) {
      throw new Error("No users found");
    }

    return users;
  } catch (error) {
    console.error("User Error:", error);

    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};

export const getAllUserTask = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: "ProjectManager",
        },
      },
      include: {
        AssignedTasks: true,
      }
    })

    const result = users.map((user) => {
      const pending = user.AssignedTasks.filter((task) => task.status === "Pending").length;
      const inProgress = user.AssignedTasks.filter((task) => task.status === "InProgress").length;
      const completed = user.AssignedTasks.filter((task) => task.status === "Completed").length;

      return {
        name: user.name,
        pending,
        inProgress,
        completed
      }
    })

    return result
  } catch (error) {
    console.error("User Error:", error);

    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};
