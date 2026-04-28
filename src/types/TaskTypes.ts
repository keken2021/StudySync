export type Task = {
  taskId: number;
  taskTitle: string;
  taskType: string;
  taskDueDate: string;
  taskCreated: string;
  taskIsDone: boolean | null;
  subjectId: number;
  subjectName: string;
  userId: number;
};

export type CreateTaskDTO = {
  subjectId: number;
  taskTitle: string;
  taskType: string;
  taskDueDate: string;
};

export type UpdateTaskDTO = {
  taskTitle: string;
  taskType: string;
  taskDueDate: string;
  taskIsDone: boolean;
};
