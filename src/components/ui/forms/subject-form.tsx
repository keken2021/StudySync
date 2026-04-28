import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
} from "@/components/ui/form";
import { useSubjectMutations } from "@/hooks/useSubjects";

type Props = {
    subject: any | null;
    onClose: () => void;
};

export function SubjectForm({ subject, onClose }: Props) {
    const { addMutation, editMutation } = useSubjectMutations();
    const form = useForm({
        defaultValues: {
            subjectId: subject?.subjectId || 0,
            subject: subject?.subject || "",
            units: subject?.units || "",
            semester: subject?.semester || "",
        }
    });

    const onSubmit = async (data: any) => {
        if (subject) {
            // Update Payload for UpdateSubjectDTO
            const updatePayload = {
                subjectId: data.subjectId,
                subjectName: data.subject,
                subjectUnits: Number(data.units),
                subjectSemester: data.semester
            };
            await editMutation.mutateAsync(updatePayload);
        } else {
            // Add Payload for CreateSubjectDTO
            await addMutation.mutateAsync({
                subject: data.subject,
                units: Number(data.units),
                semester: data.semester
            });
        }
        onClose();
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="units"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Units</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="semester"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Semester</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full">
                    {subject ? "Update" : "Add"}
                </Button>
            </form>
        </Form>
    );
}