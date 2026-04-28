import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import type { Task } from "@/types/TaskTypes";

const fetchTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const getTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    staleTime: 0,
  });
};

// Update task
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      ...taskData
    }: {
      taskId: number;
      taskTitle: string;
      taskType: string;
      taskDueDate: string;
      taskIsDone: boolean;
    }) => {
      const payload = {
        taskTitle: taskData.taskTitle,
        taskType: taskData.taskType,
        taskDueDate: taskData.taskDueDate,
        taskIsDone: taskData.taskIsDone,
      };

      const res = await api.put(`/tasks/${taskId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskData: {
      subjectId: number;
      taskTitle: string;
      taskType: string;
      taskDueDate: string;
    }) => {
      const payload = {
        subjectId: taskData.subjectId,
        taskTitle: taskData.taskTitle,
        taskType: taskData.taskType,
        taskDueDate: taskData.taskDueDate,
      };

      console.log("Creating task with payload:", payload);

      const res = await api.post("/tasks", payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

// Delete task
export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (taskId: number) => {
      const res = await api.delete(`/tasks/${taskId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
