import api from "@/api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const fetchSubjects = async () => {
  const res = await api.get("/subject");
  return res.data;
};

export const getSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: fetchSubjects,
    staleTime: 0,
  });
};


export const useSubjectMutations = () => {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (data: any) => api.post("/subject/add", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });

  const editMutation = useMutation({
    mutationFn: (data: any) => api.put("/subject/edit", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["subjects"] }),
  });

const deleteMutation = useMutation({
    mutationFn: (id: number) => api.delete(`/subject/${id}`),

    // 🔥 Optimistic update (instant UI)
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["subjects"] });

      const previousSubjects = queryClient.getQueryData(["subjects"]);

      queryClient.setQueryData(["subjects"], (old: any = []) =>
        old.filter((s: any) => s.subjectId !== id)
      );

      return { previousSubjects };
    },

    // ❌ rollback if error
    onError: (err, id, context) => {
      queryClient.setQueryData(["subjects"], context?.previousSubjects);
    },

    // ✅ ensure sync
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["subjects"] });
    },
  });


  return { addMutation, editMutation, deleteMutation };
};