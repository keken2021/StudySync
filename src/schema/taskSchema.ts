import z from "zod";

export const createTaskSchema = z.object({
  subjectId: z.number(),
  taskTitle: z.string().min(2, "Title must be at least 2 characters."),
  taskType: z.enum(["assignment", "exam", "project", "quiz"] as const, "Please select a task type."),
  taskDueDate: z
    .string()
    .min(1, "Due date is required.")
    .refine((val) => val >= new Date().toISOString().split("T")[0], {
      message: "Due date cannot be in the past.",
    }),
});

export const updateTaskSchema = createTaskSchema.omit({ subjectId: true });

export type CreateTaskFormValues = z.infer<typeof createTaskSchema>;
export type UpdateTaskFormValues = z.infer<typeof updateTaskSchema>;