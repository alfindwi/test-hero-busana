CREATE TYPE "Role" AS ENUM ('ProjectManager', 'Developer', 'QA', 'QC');
CREATE TYPE "Status" AS ENUM ('Pending', 'InProgress', 'Completed');

CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role "Role" DEFAULT 'Developer' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "Task" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status "Status" DEFAULT 'Pending' NOT NULL,
  description TEXT NOT NULL,
  startDate TIMESTAMP NOT NULL,
  endDate TIMESTAMP NOT NULL,
  assignedTo INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT fk_assignee FOREIGN KEY ("assignedTo") REFERENCES "User" ("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE TABLE "TaskLogs" (
  id SERIAL PRIMARY KEY,
  taskId INT NOT NULL,
  previous_status "Status" NOT NULL,
  new_status "Status" NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  CONSTRAINT fk_task FOREIGN KEY ("taskId") REFERENCES "Task" ("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


INSERT INTO "User" (name, email, password, role) VALUES
(
  'alfin',
  'AlfinDev@mail.com', '123456', 'Developer'
),
(
  'furi',
  'FuriQA@mail.com', '123456', 'QA'
),
(
  'cahya',
  'CahyaQC@mail.com', '123456', 'QC'
);

INSERT INTO "Task" (name, status, description, startDate, endDate, assignedTo) VALUES (
  'Implement Login ',
  'InProgress',
  'Membuat fitur login untuk website a',
  '2025-10-10',
  '2025-10-20',
  
),
(
  'Testing Login Feature',
  'Pending',
  'Melakukan test pada fitur login',
  '2025-10-20',
  '2025-10-23',
  3
),
(
  'Implement Register Feature',
  'Completed',
  'Membuat fitur register untuk website a',
  '2025-10-05',
  '2025-10-10',
  1
)