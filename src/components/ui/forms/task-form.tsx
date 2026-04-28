import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Task } from "@/types/TaskTypes";
import { getSubjects } from "@/hooks/useSubjects";

type TaskFormProps = {
  task: Task | null;
  onClose: () => void;
  onSave: (data: {
    subjectId?: number;
    taskTitle: string;
    taskType: string;
    taskDueDate: string;
    taskIsDone?: boolean;
  }) => void;
};

export function TaskForm({ task, onClose, onSave }: TaskFormProps) {
  const { data: subjects } = getSubjects();
  const [formData, setFormData] = useState({
    subjectId: "",
    taskTitle: "",
    taskType: "",
    taskDueDate: "",
    taskIsDone: false,
  });

  // Initialize form when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        subjectId: task.subjectId?.toString() || "",
        taskTitle: task.taskTitle || "",
        taskType: task.taskType || "",
        taskDueDate: task.taskDueDate || "",
        taskIsDone: task.taskIsDone === true,
      });
    } else {
      setFormData({
        subjectId: "",
        taskTitle: "",
        taskType: "",
        taskDueDate: "",
        taskIsDone: false,
      });
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // For edit: include taskIsDone, exclude subjectId
    // For create: include subjectId, exclude taskIsDone
    if (task) {
      // Update existing task
      onSave({
        taskTitle: formData.taskTitle,
        taskType: formData.taskType,
        taskDueDate: formData.taskDueDate,
        taskIsDone: formData.taskIsDone,
      });
    } else {
      // Create new task
      if (!formData.subjectId) {
        console.error("Subject ID is required");
        return;
      }
      onSave({
        subjectId: parseInt(formData.subjectId),
        taskTitle: formData.taskTitle,
        taskType: formData.taskType,
        taskDueDate: formData.taskDueDate,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Subject Selector - Only show for new tasks */}
      {!task && (
        <div className="space-y-2">
          <Label htmlFor="subjectId" className="text-sm font-medium text-slate-700">
            Subject
          </Label>
          <Select
            value={formData.subjectId}
            onValueChange={(value) => setFormData({ ...formData, subjectId: value })}
            required
          >
            <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects?.map((subject: any) => (
                <SelectItem key={subject.subjectId} value={subject.subjectId.toString()}>
                  {subject.subject} ({subject.units} units)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="taskTitle" className="text-sm font-medium text-slate-700">
          Task Title
        </Label>
        <Input
          id="taskTitle"
          value={formData.taskTitle}
          onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
          placeholder="Enter task title"
          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="taskType" className="text-sm font-medium text-slate-700">
          Task Type
        </Label>
        <Input
          id="taskType"
          value={formData.taskType}
          onChange={(e) => setFormData({ ...formData, taskType: e.target.value })}
          placeholder="e.g., Assignment, Quiz, Exam"
          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="taskDueDate" className="text-sm font-medium text-slate-700">
          Due Date
        </Label>
        <Input
          id="taskDueDate"
          type="date"
          value={formData.taskDueDate}
          onChange={(e) => setFormData({ ...formData, taskDueDate: e.target.value })}
          className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      {/* Status checkbox - Only show for editing existing tasks */}
      {task && (
        <div className="flex items-center gap-3 pt-2">
          <Checkbox
            id="taskIsDone"
            checked={formData.taskIsDone}
            onCheckedChange={(checked) => {
              setFormData({ ...formData, taskIsDone: checked === true });
            }}
            className="border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <Label
            htmlFor="taskIsDone"
            className="text-sm font-medium text-slate-700 cursor-pointer"
          >
            Mark as completed
          </Label>
        </div>
      )}

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {task ? "Update Task" : "Add Task"}
        </Button>
      </div>
    </form>
  );
}