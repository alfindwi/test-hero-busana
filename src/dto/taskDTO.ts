
export interface CreateTaskDTO {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  userId: string; 
}

export interface UpdateTaskDTO {
  name?: string;
  description?: string;
  status?: 'Pending' | 'InProgress' | 'Completed';
  startDate?: Date;
  endDate?: Date;
}
