

CREATE TYPE "Status" AS ENUM (
  'Pending',
  'InProgress',
  'Completed'
);

CREATE TYPE "Role" AS ENUM (
  'ProjectManager',
  'Developer',
  'QA',
  'QC'
);



CREATE TABLE "User" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "email" TEXT UNIQUE NOT NULL,
  "password" TEXT NOT NULL,
  "role" "Role" NOT NULL DEFAULT 'Developer',
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW()
);



CREATE TABLE "Task" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" TEXT NOT NULL,
  "status" "Status" NOT NULL DEFAULT 'Pending',
  "description" TEXT NOT NULL,
  "startDate" TIMESTAMP NOT NULL,
  "endDate" TIMESTAMP NOT NULL,
  "user_id" UUID NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT "Task_user_id_fkey"
    FOREIGN KEY ("user_id")
    REFERENCES "User"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);



CREATE TABLE "TaskLogs" (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "task_id" UUID NOT NULL,
  "previous_status" "Status" NOT NULL,
  "new_status" "Status" NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW(),
  "updated_at" TIMESTAMP DEFAULT NOW(),
  CONSTRAINT "TaskLogs_task_id_fkey"
    FOREIGN KEY ("task_id")
    REFERENCES "Task"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
