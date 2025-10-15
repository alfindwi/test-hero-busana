
export interface CreateTaskDTO {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  assignedTo: number; 
}

export interface UpdateTaskDTO {
  name?: string;
  description?: string;
  status?: 'Pending' | 'InProgress' | 'Completed';
  startDate?: Date;
  endDate?: Date;
}
