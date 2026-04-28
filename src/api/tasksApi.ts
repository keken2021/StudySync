
import { useQuery } from "@tanstack/react-query";
import api from "@/api/axios";

const fetchTasks = async () => {
  const res = await api.get("/tasks");
  console.log("Fetched tasks:", res.data);
  return res.data;
};

export const getTasks = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    staleTime: 0,
  });
};



// export const tasksApi = {
//   getAll: (params?: { subjectId?: number; isDone?: boolean }) =>
//     axiosClient.get<Task[]>("/tasks", { params }).then((r) => r.data),

//   getUpcoming: () =>
//     axiosClient.get<Task[]>("/tasks/upcoming").then((r) => r.data),

//   getById: (id: number) =>
//     axiosClient.get<Task>(`/tasks/${id}`).then((r) => r.data),

//   create: (data: CreateTaskRequest) =>
//     axiosClient.post<Task>("/tasks", data).then((r) => r.data),

//   update: (id: number, data: UpdateTaskRequest) =>
//     axiosClient.put<Task>(`/tasks/${id}`, data).then((r) => r.data),

//   toggle: (id: number) =>
//     axiosClient.put<Task>(`/tasks/${id}/toggle`).then((r) => r.data),

//   delete: (id: number) =>
//     axiosClient.delete(`/tasks/${id}`),
// };