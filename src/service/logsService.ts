import { prisma } from "../libs/prisma";

export const getLogsById = async (id: string) => {
  try {
    const logs = await prisma.taskLogs.findMany({
      where: {
        taskId: id,
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return logs.map((log) => ({
      id: log.id,
      taskId: log.taskId,
      previous_status: log.previous_status,
      new_status: log.new_status,
      created_at: log.created_at,
    }));
  } catch (error) {
    console.error("Task ById Error:", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
  }
};
