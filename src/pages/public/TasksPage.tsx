import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { getTasks, useUpdateTask, useDeleteTask, useCreateTask } from "@/api/tasksApi";
import type { Task } from "@/types/TaskTypes";
import { Plus, Pencil, Trash2, ClipboardList, Calendar, CheckCircle2, Circle } from "lucide-react";
import { Main } from "./Main";
import { format } from "date-fns";
import { TaskForm } from "@/components/ui/forms/task-form";

export default function TasksPage() {
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  
  const { data: tasks = [], isLoading, error } = getTasks();
  const updateTask = useUpdateTask();
  const createTask = useCreateTask();
  const deleteTask = useDeleteTask();

  if (isLoading) {
    return (
      <Main>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
            Loading tasks…
          </div>
        </div>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-sm text-red-500">Failed to load tasks.</p>
        </div>
      </Main>
    );
  }

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelectedTask(null);
    setOpen(true);
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete) {
      await deleteTask.mutateAsync(taskToDelete.taskId);
      setDeleteDialogOpen(false);
      setTaskToDelete(null);
    }
  };

  const handleSave = async (data: any) => {
    if (selectedTask) {
      // Update existing task
      await updateTask.mutateAsync({
        taskId: selectedTask.taskId,
        taskTitle: data.taskTitle,
        taskType: data.taskType,
        taskDueDate: data.taskDueDate,
        taskIsDone: data.taskIsDone || false,
      });
    } else {
      // Create new task
      await createTask.mutateAsync({
        subjectId: data.subjectId,
        taskTitle: data.taskTitle,
        taskType: data.taskType,
        taskDueDate: data.taskDueDate,
      });
    }
    setOpen(false);
  };

  const getStatusBadge = (isDone: boolean | null) => {
    if (isDone) {
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs font-semibold hover:bg-emerald-100 gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Completed
        </Badge>
      );
    }
    return (
      <Badge className="bg-amber-100 text-amber-700 border-0 text-xs font-semibold hover:bg-amber-100 gap-1">
        <Circle className="h-3 w-3" />
        Pending
      </Badge>
    );
  };

  return (
    <Main>
      <div className="px-8 py-8 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
              Academics
            </p>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Tasks</h1>
            <p className="text-slate-500 text-sm">
              {tasks?.length ?? 0} task{tasks?.length !== 1 ? "s" : ""} total
            </p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 text-sm font-medium rounded-lg gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Task
          </Button>
        </div>

        {/* Table Card */}
        <Card className="bg-white border border-slate-200 shadow-none rounded-xl overflow-hidden">
          {tasks?.length === 0 ? (
            <CardContent className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <ClipboardList className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700">No tasks yet</p>
              <p className="text-xs text-slate-400">
                Click "Add Task" to create your first task.
              </p>
            </CardContent>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="text-xs font-semibold tracking-wider text-slate-500 uppercase pl-6 py-3">
                    Task Title
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-slate-500 uppercase py-3">
                    Subject
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-slate-500 uppercase py-3">
                    Type
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-slate-500 uppercase py-3">
                    Due Date
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-slate-500 uppercase py-3">
                    Status
                  </TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-slate-500 uppercase py-3 pr-6 text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task: Task) => (
                  <TableRow
                    key={task.taskId}
                    className="border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <TableCell className="pl-6 py-3.5 font-medium text-slate-800 text-sm">
                      {task.taskTitle}
                    </TableCell>
                    <TableCell className="py-3.5 text-slate-600 text-sm">
                      {task.subjectName}
                    </TableCell>
                    <TableCell className="py-3.5">
                      <Badge className="bg-slate-100 text-slate-700 border-0 text-xs font-semibold hover:bg-slate-100">
                        {task.taskType}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-1.5 text-slate-600 text-sm">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        {task.taskDueDate && format(new Date(task.taskDueDate), "MMM dd, yyyy")}
                      </div>
                    </TableCell>
                    <TableCell className="py-3.5">
                      {getStatusBadge(task.taskIsDone)}
                    </TableCell>
                    <TableCell className="py-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(task)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(task)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>

      {/* Task Form Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white border border-slate-200 shadow-xl rounded-2xl p-0 max-w-md overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle className="text-base font-bold text-slate-900">
              {selectedTask ? "Edit Task" : "Add Task"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-0.5">
              Fill in the task details below.
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6 pt-4">
            <TaskForm
              task={selectedTask}
              onClose={() => setOpen(false)}
              onSave={handleSave}
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border border-slate-200 rounded-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-900">Delete Task</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500">
              Are you sure you want to delete "{taskToDelete?.taskTitle}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-slate-200 text-slate-700 hover:bg-slate-50">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Main>
  );
}