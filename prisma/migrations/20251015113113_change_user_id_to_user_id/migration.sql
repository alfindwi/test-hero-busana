/*
  Warnings:

  - You are about to drop the column `user_id` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `task_id` on the `TaskLogs` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taskId` to the `TaskLogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."TaskLogs" DROP CONSTRAINT "TaskLogs_task_id_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "user_id",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TaskLogs" DROP COLUMN "task_id",
ADD COLUMN     "taskId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskLogs" ADD CONSTRAINT "TaskLogs_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
