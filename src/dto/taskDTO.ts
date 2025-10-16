export interface CreateTaskDTO {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  assignedTo: number;
  status: "Pending" | "InProgress" | "Completed";
}

export interface UpdateTaskDTO {
  name?: string;
  description?: string;
  status?: "Pending" | "InProgress" | "Completed";
  startDate?: string;
  endDate?: string;
}
