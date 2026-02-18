import { Form, Head, router, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { GraduationCap, Plus, Edit, Trash2 } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { index as gradesIndex, store, update, destroy } from '@/routes/grades';

interface Grade {
    id: number;
    name: string;
    students_count?: number;
}

interface Props {
    grades: Grade[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Grades',
        href: gradesIndex().url,
    },
];

export default function GradesIndex({ grades }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
    const [editingGrade, setEditingGrade] = useState<Grade | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteGrade, setDeleteGrade] = useState<Grade | null>(null);

    const gradeForm = useForm({
        name: '',
    });

    useEffect(() => {
        if (editingGrade) {
            gradeForm.setData({
                name: editingGrade.name,
            });
            setShowDialog(true);
        } else {
            gradeForm.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingGrade]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingGrade) {
            gradeForm.put(update({ grade: editingGrade.id }).url, {
                onSuccess: () => {
                    setEditingGrade(null);
                    setShowDialog(false);
                    gradeForm.reset();
                },
            });
        } else {
            gradeForm.post(store().url, {
                onSuccess: () => {
                    setShowDialog(false);
                    gradeForm.reset();
                },
            });
        }
    };

    const handleDelete = (grade: Grade) => {
        router.delete(destroy({ grade: grade.id }).url);
        setDeleteGrade(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Grade Management" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {flash.success}
                    </div>
                )}

                {flash?.error && (
                    <div className="rounded-md bg-red-50 p-4 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
                        {flash.error}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Grade Management</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage grade levels for students
                        </p>
                    </div>
                    <Dialog open={showDialog} onOpenChange={(open) => {
                        setShowDialog(open);
                        if (!open) {
                            setEditingGrade(null);
                            gradeForm.reset();
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Grade
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    {editingGrade ? 'Edit Grade' : 'Add New Grade'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingGrade
                                        ? 'Update the grade name'
                                        : 'Create a new grade level for students'}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Grade Name *</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={gradeForm.data.name}
                                            onChange={(e) => gradeForm.setData('name', e.target.value)}
                                            placeholder="e.g., Grade 1, Kindergarten"
                                            required
                                            autoFocus
                                        />
                                        <InputError message={gradeForm.errors.name} />
                                    </div>
                                </div>
                                <DialogFooter className="mt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setShowDialog(false);
                                            setEditingGrade(null);
                                            gradeForm.reset();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={gradeForm.processing}>
                                        {editingGrade ? 'Update' : 'Create'} Grade
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="h-5 w-5" />
                            All Grades
                        </CardTitle>
                        <CardDescription>
                            {grades.length} {grades.length === 1 ? 'grade' : 'grades'} registered
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Students</th>
                                        <th className="px-4 py-2 text-right text-sm font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {grades.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={3}
                                                className="px-4 py-8 text-center text-muted-foreground"
                                            >
                                                No grades registered yet
                                            </td>
                                        </tr>
                                    ) : (
                                        grades.map((grade) => (
                                            <tr key={grade.id} className="border-b">
                                                <td className="px-4 py-2 font-medium">{grade.name}</td>
                                                <td className="px-4 py-2 text-muted-foreground">
                                                    {grade.students_count || 0} student
                                                    {(grade.students_count || 0) !== 1 ? 's' : ''}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setEditingGrade(grade)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setDeleteGrade(grade)}
                                                            disabled={(grade.students_count || 0) > 0}
                                                            title={
                                                                (grade.students_count || 0) > 0
                                                                    ? 'Cannot delete grade with students'
                                                                    : 'Delete grade'
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                {deleteGrade && (
                    <Dialog open={!!deleteGrade} onOpenChange={(open) => !open && setDeleteGrade(null)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Grade</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete "{deleteGrade.name}"? This action cannot be undone.
                                    {(deleteGrade.students_count || 0) > 0 && (
                                        <span className="block mt-2 text-red-600 dark:text-red-400">
                                            This grade has {deleteGrade.students_count} student
                                            {(deleteGrade.students_count || 0) !== 1 ? 's' : ''} assigned and cannot be deleted.
                                        </span>
                                    )}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setDeleteGrade(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(deleteGrade)}
                                    disabled={(deleteGrade.students_count || 0) > 0}
                                >
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </AppLayout>
    );
}
