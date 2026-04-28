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
import { SubjectForm } from "@/components/ui/forms/subject-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { getSubjects, useSubjectMutations } from "@/hooks/useSubjects";
import type { Subject } from "@/types/SubjectTypes";
import { Plus, Pencil, Trash2, BookOpen } from "lucide-react";
import { Main } from "./Main";

export default function SubjectPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Subject | null>(null);
  const { data: subjects, isLoading, error } = getSubjects();
  const { deleteMutation } = useSubjectMutations();

  if (isLoading) {
    return (
      <Main>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <div className="w-4 h-4 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
            Loading subjects…
          </div>
        </div>
      </Main>
    );
  }

  if (error) {
    return (
      <Main>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-sm text-red-500">Failed to load subjects.</p>
        </div>
      </Main>
    );
  }

  const handleEdit = (subject: Subject) => {
    setSelected(subject);
    setOpen(true);
  };

  const handleAdd = () => {
    setSelected(null);
    setOpen(true);
  };

  return (
    <Main>
      <div className="px-8 py-8 max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Academics</p>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Subjects</h1>
            <p className="text-slate-500 text-sm">
              {subjects?.length ?? 0} subject{subjects?.length !== 1 ? "s" : ""} enrolled
            </p>
          </div>
          <Button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 text-sm font-medium rounded-lg gap-1.5"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Subject
          </Button>
        </div>

        {/* Table Card */}
        <Card className="bg-white border border-slate-200 shadow-none rounded-xl overflow-hidden">
          {subjects?.length === 0 ? (
            <CardContent className="flex flex-col items-center justify-center py-20 space-y-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-slate-400" />
              </div>
              <p className="text-sm font-medium text-slate-700">No subjects yet</p>
              <p className="text-xs text-slate-400">Click "Add Subject" to enroll your first subject.</p>
            </CardContent>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="text-xs font-semibold tracking-wider text-slate-500 uppercase pl-6 py-3">Subject</TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-slate-500 uppercase py-3">Units</TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-slate-500 uppercase py-3">Semester</TableHead>
                  <TableHead className="text-xs font-semibold tracking-wider text-slate-500 uppercase py-3 pr-6 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((s: Subject) => (
                  <TableRow key={s.subjectId} className="border-slate-100 hover:bg-slate-50 transition-colors">
                    <TableCell className="pl-6 py-3.5 font-medium text-slate-800 text-sm">{s.subject}</TableCell>
                    <TableCell className="py-3.5">
                      <Badge className="bg-slate-100 text-slate-700 border-0 text-xs font-semibold hover:bg-slate-100">
                        {s.units} {s.units === 1 ? "unit" : "units"}
                      </Badge>
                    </TableCell>
                    <TableCell className="py-3.5 text-slate-600 text-sm">{s.semester}</TableCell>
                    <TableCell className="py-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(s)}
                          className="h-8 w-8 p-0 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteMutation.mutate(s.subjectId)}
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

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white border border-slate-200 shadow-xl rounded-2xl p-0 max-w-md overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-0">
            <DialogTitle className="text-base font-bold text-slate-900">
              {selected ? "Edit Subject" : "Add Subject"}
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500 mt-0.5">
              Fill in the subject details below.
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-6 pt-4">
            <SubjectForm subject={selected} onClose={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </Main>
  );
}