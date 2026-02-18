import { Form, Head, router, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Users, Plus, Edit, Trash2, Printer, Bus, GraduationCap } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
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
import { index as rollcallIndex, store, update, destroy, print as printRoute } from '@/routes/rollcall';
import { storeGrade, storeBus } from '@/actions/App/Http/Controllers/RollcallController';

interface Grade {
    id: number;
    name: string;
}

interface Bus {
    id: number;
    number: string;
    name?: string;
}

interface StudentBusTrip {
    id: number;
    bus_id: number;
    trip_type: string;
    pivot: {
        trip_type: string;
    };
}

interface Student {
    id: number;
    name: string;
    grade_id?: number;
    transport: boolean;
    grade?: Grade;
    buses?: StudentBusTrip[];
}

interface Props {
    students: Student[];
    grades: Grade[];
    buses: Bus[];
}

const tripTypes = [
    { value: 'trip_1_morning', label: 'Trip 1 Morning' },
    { value: 'trip_2_morning', label: 'Trip 2 Morning' },
    { value: 'trip_1_evening', label: 'Trip 1 Evening' },
    { value: 'trip_2_evening', label: 'Trip 2 Evening' },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rollcall',
        href: rollcallIndex().url,
    },
];

export default function RollcallIndex({ students, grades, buses }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string } };
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [showGradeDialog, setShowGradeDialog] = useState(false);
    const [showBusDialog, setShowBusDialog] = useState(false);
    const [newGradeName, setNewGradeName] = useState('');
    const [newBusNumber, setNewBusNumber] = useState('');
    const [newBusName, setNewBusName] = useState('');

    const studentForm = useForm({
        name: '',
        grade_id: '',
        grade_name: '',
        transport: false,
        bus_id: '',
        trip_types: [] as string[],
    });

    useEffect(() => {
        if (editingStudent) {
            const firstBus = editingStudent.buses?.[0];
            studentForm.setData({
                name: editingStudent.name,
                grade_id: editingStudent.grade_id?.toString() || '',
                grade_name: '',
                transport: editingStudent.transport,
                bus_id: firstBus?.id?.toString() || '',
                trip_types: editingStudent.buses?.map((b) => b.pivot?.trip_type).filter(Boolean) || [],
            });
        } else {
            studentForm.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingStudent]);

    const formatTripType = (tripType: string): string => {
        const trip = tripTypes.find((t) => t.value === tripType);
        return trip ? trip.label : tripType;
    };

    const handleDelete = (studentId: number) => {
        if (confirm('Are you sure you want to delete this student?')) {
            router.delete(destroy({ student: studentId }).url);
        }
    };

    const handleStudentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const submitData: any = {
            name: studentForm.data.name,
            transport: studentForm.data.transport,
        };

        if (studentForm.data.grade_id) {
            submitData.grade_id = parseInt(studentForm.data.grade_id);
        }
        if (studentForm.data.grade_name) {
            submitData.grade_name = studentForm.data.grade_name;
        }

        if (studentForm.data.transport && studentForm.data.bus_id) {
            submitData.bus_id = parseInt(studentForm.data.bus_id);
            submitData.trip_types = studentForm.data.trip_types;
        }

        if (editingStudent) {
            studentForm.transform(() => submitData).put(update({ student: editingStudent.id }).url, {
                onSuccess: () => {
                    setEditingStudent(null);
                    studentForm.reset();
                },
            });
        } else {
            studentForm.transform(() => submitData).post(store().url, {
                onSuccess: () => {
                    studentForm.reset();
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rollcall Management" />

            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        {flash.success}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Rollcall Management</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage students, grades, and transportation assignments
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Dialog open={showGradeDialog} onOpenChange={setShowGradeDialog}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <GraduationCap className="mr-2 h-4 w-4" />
                                    Add Grade
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Grade</DialogTitle>
                                    <DialogDescription>
                                        Create a new grade level for students
                                    </DialogDescription>
                                </DialogHeader>
                                <Form
                                    {...storeGrade.form()}
                                    onSuccess={() => {
                                        setShowGradeDialog(false);
                                        setNewGradeName('');
                                    }}
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="grid gap-2">
                                                <Label htmlFor="grade_name">Grade Name</Label>
                                                <Input
                                                    id="grade_name"
                                                    name="name"
                                                    value={newGradeName}
                                                    onChange={(e) => setNewGradeName(e.target.value)}
                                                    placeholder="e.g., Grade 1, Kindergarten"
                                                    required
                                                />
                                                <InputError message={errors.name} />
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setShowGradeDialog(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" disabled={processing}>
                                                    Create Grade
                                                </Button>
                                            </DialogFooter>
                                        </>
                                    )}
                                </Form>
                            </DialogContent>
                        </Dialog>

                        <Dialog open={showBusDialog} onOpenChange={setShowBusDialog}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Bus className="mr-2 h-4 w-4" />
                                    Add Bus
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Bus</DialogTitle>
                                    <DialogDescription>
                                        Register a new bus for transportation
                                    </DialogDescription>
                                </DialogHeader>
                                <Form
                                    {...storeBus.form()}
                                    onSuccess={() => {
                                        setShowBusDialog(false);
                                        setNewBusNumber('');
                                        setNewBusName('');
                                    }}
                                >
                                    {({ processing, errors }) => (
                                        <>
                                            <div className="grid gap-4">
                                                <div className="grid gap-2">
                                                    <Label htmlFor="bus_number">Bus Number *</Label>
                                                    <Input
                                                        id="bus_number"
                                                        name="number"
                                                        value={newBusNumber}
                                                        onChange={(e) => setNewBusNumber(e.target.value)}
                                                        placeholder="e.g., BUS-001"
                                                        required
                                                    />
                                                    <InputError message={errors.number} />
                                                </div>
                                                <div className="grid gap-2">
                                                    <Label htmlFor="bus_name">Bus Name (Optional)</Label>
                                                    <Input
                                                        id="bus_name"
                                                        name="name"
                                                        value={newBusName}
                                                        onChange={(e) => setNewBusName(e.target.value)}
                                                        placeholder="e.g., Route A"
                                                    />
                                                    <InputError message={errors.name} />
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setShowBusDialog(false)}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit" disabled={processing}>
                                                    Create Bus
                                                </Button>
                                            </DialogFooter>
                                        </>
                                    )}
                                </Form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Add Student Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" />
                                {editingStudent ? 'Edit Student' : 'Add New Student'}
                            </CardTitle>
                            <CardDescription>
                                {editingStudent
                                    ? 'Update student information and transportation details'
                                    : 'Enter student details and assign transportation if needed'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleStudentSubmit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Student Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        value={studentForm.data.name}
                                        onChange={(e) => studentForm.setData('name', e.target.value)}
                                        required
                                        placeholder="Enter student full name"
                                    />
                                    <InputError message={studentForm.errors.name} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="grade_id">Grade</Label>
                                    <Select
                                        value={studentForm.data.grade_id || undefined}
                                        onValueChange={(value) => studentForm.setData('grade_id', value)}
                                    >
                                        <SelectTrigger id="grade_id">
                                            <SelectValue placeholder="Select grade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {grades.map((grade) => (
                                                <SelectItem
                                                    key={grade.id}
                                                    value={grade.id.toString()}
                                                >
                                                    {grade.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={studentForm.errors.grade_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="grade_name">Or Enter New Grade Name</Label>
                                    <Input
                                        id="grade_name"
                                        name="grade_name"
                                        value={studentForm.data.grade_name}
                                        onChange={(e) => studentForm.setData('grade_name', e.target.value)}
                                        placeholder="Leave empty if grade selected above"
                                    />
                                    <InputError message={studentForm.errors.grade_name} />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="transport"
                                        name="transport"
                                        checked={studentForm.data.transport}
                                        onChange={(e) => studentForm.setData('transport', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <Label
                                        htmlFor="transport"
                                        className="text-sm font-normal cursor-pointer"
                                    >
                                        Student uses transportation
                                    </Label>
                                </div>

                                {studentForm.data.transport && (
                                    <>
                                        <div className="grid gap-2">
                                            <Label htmlFor="bus_id">Bus *</Label>
                                            <Select
                                                value={studentForm.data.bus_id || undefined}
                                                onValueChange={(value) => studentForm.setData('bus_id', value)}
                                                required={studentForm.data.transport}
                                            >
                                                <SelectTrigger id="bus_id">
                                                    <SelectValue placeholder="Select bus" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {buses.map((bus) => (
                                                        <SelectItem
                                                            key={bus.id}
                                                            value={bus.id.toString()}
                                                        >
                                                            {bus.number} {bus.name && `- ${bus.name}`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <InputError message={studentForm.errors.bus_id} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label>Trip Types *</Label>

                                            {/* Select all trips */}
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    id="trip_all"
                                                    checked={studentForm.data.trip_types.length === tripTypes.length}
                                                    onChange={(e) => {
                                                        const allValues = tripTypes.map((t) => t.value);
                                                        studentForm.setData(
                                                            'trip_types',
                                                            e.target.checked ? allValues : [],
                                                        );
                                                    }}
                                                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                />
                                                <Label
                                                    htmlFor="trip_all"
                                                    className="text-sm font-normal cursor-pointer"
                                                >
                                                    Select all trips
                                                </Label>
                                            </div>

                                            {/* Individual trips */}
                                            <div className="grid grid-cols-2 gap-2">
                                                {tripTypes.map((trip) => (
                                                    <div key={trip.value} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`trip_${trip.value}`}
                                                            name="trip_types[]"
                                                            value={trip.value}
                                                            checked={studentForm.data.trip_types.includes(trip.value)}
                                                            onChange={(e) => {
                                                                const newTripTypes = e.target.checked
                                                                    ? [...studentForm.data.trip_types, trip.value]
                                                                    : studentForm.data.trip_types.filter(
                                                                          (t) => t !== trip.value,
                                                                      );
                                                                studentForm.setData('trip_types', newTripTypes);
                                                            }}
                                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                                        />
                                                        <Label
                                                            htmlFor={`trip_${trip.value}`}
                                                            className="text-sm font-normal cursor-pointer"
                                                        >
                                                            {trip.label}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                            <InputError message={studentForm.errors.trip_types} />
                                        </div>
                                    </>
                                )}

                                <div className="flex gap-2">
                                    <Button type="submit" disabled={studentForm.processing}>
                                        {editingStudent ? 'Update Student' : 'Add Student'}
                                    </Button>
                                    {editingStudent && (
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => {
                                                setEditingStudent(null);
                                                studentForm.reset();
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Students List */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Student Roster
                                    </CardTitle>
                                    <CardDescription>
                                        {students.length} {students.length === 1 ? 'student' : 'students'} registered
                                    </CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.visit(printRoute({ query: { grouped: 'false' } }).url)}
                                    >
                                        <Printer className="mr-2 h-4 w-4" />
                                        Print Individual
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => router.visit(printRoute({ query: { grouped: 'true' } }).url)}
                                    >
                                        <Printer className="mr-2 h-4 w-4" />
                                        Print Grouped
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b">
                                            <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium">Grade</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium">Transport</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium">Trips</th>
                                            <th className="px-4 py-2 text-right text-sm font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                                                    No students registered yet
                                                </td>
                                            </tr>
                                        ) : (
                                            students.map((student) => (
                                                <tr key={student.id} className="border-b">
                                                    <td className="px-4 py-2">{student.name}</td>
                                                    <td className="px-4 py-2">
                                                        {student.grade?.name || 'N/A'}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {student.transport ? 'Yes' : 'No'}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {student.transport && student.buses && student.buses.length > 0
                                                            ? student.buses
                                                                  .map((b) => formatTripType(b.pivot?.trip_type || ''))
                                                                  .filter(Boolean)
                                                                  .join(', ')
                                                            : '-'}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => setEditingStudent(student)}
                                                            >
                                                                <Edit className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => handleDelete(student.id)}
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
                </div>
            </div>
        </AppLayout>
    );
}
