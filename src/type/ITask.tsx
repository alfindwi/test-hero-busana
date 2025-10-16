export interface ITask {
  id: string;
  name: string;
  status: "pending" | "in-progress" | "completed";
  description?: string;
  startDate?: string;
  endDate?: string;
  assignedTo: number;
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
}
