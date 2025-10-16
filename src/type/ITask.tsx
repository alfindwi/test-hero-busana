export interface ITask {
  id: number;
  name: string;
  status: "Pending" | "InProgress" | "Completed";
  description?: string;
  startDate: string;
  endDate: string;
  assignedTo: number;
  assigned: assigned;
}

export interface assigned {
  name: string;
  role: string;
}

export interface TaskLog {
  id: number;
  taskId: number;
  previous_status: string;
  new_status: string;
  created_at: string;
  updated_at: string;
}

export interface TaskDetail {
  id: number;
  name: string;
  status: "Pending" | "InProgress" | "Completed";
  description: string;
  startDate: string;
  endDate: string;
  assignedTo: number;
  created_at: string;
  updated_at: string;
  logs: TaskLog[];
  assignee: { name: string; role: string };
}

export interface CreateTaskDTO {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  assignedTo: number;
  status: string;
}

export interface UpdateTaskDTO {
  name?: string;
  description?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}
