export interface Task {
  taskId: number;
  subjectId: number;
  userId: number;
  subjectName: string;
  taskTitle: string | null;
  taskType: string | null;
  taskDueDate: string | null;
  taskIsDone: boolean | null;
  taskCreated: string | null;
}

export interface CreateTaskRequest {
  subjectId: number;
  taskTitle: string;
  taskType: string;
  taskDueDate: string;
}

export interface UpdateTaskRequest {
  taskTitle: string;
  taskType: string;
  taskDueDate: string;
}
