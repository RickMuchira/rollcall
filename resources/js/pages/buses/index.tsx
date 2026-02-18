import { Form, Head, router, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Bus, Plus, Edit, Trash2, Users, ChevronDown, ChevronRight } from 'lucide-react';
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
import { index as busesIndex, show } from '@/routes/buses';

interface Bus {
    id: number;
    number: string;
    name?: string;
    students_count?: number;
    students?: Student[];
    busStaff?: BusStaff[];
}

interface BusStaff {
    id: number;
    trip_type: string;
    role: string;
    staff_name: string;
}

interface Student {
    id: number;
    name: string;
    grade?: {
        id: number;
        name: string;
    };
    pivot?: {
        trip_type: string;
    };
}

const tripTypes = [
    { value: 'trip_1_morning', label: 'Trip 1 Morning' },
    { value: 'trip_2_morning', label: 'Trip 2 Morning' },
    { value: 'trip_1_evening', label: 'Trip 1 Evening' },
    { value: 'trip_2_evening', label: 'Trip 2 Evening' },
];

const formatTripType = (tripType: string): string => {
    const trip = tripTypes.find((t) => t.value === tripType);
    return trip ? trip.label : tripType;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Buses',
        href: busesIndex().url,
    },
];

export default function BusesIndex({ buses }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };
    const [editingBus, setEditingBus] = useState<Bus | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteBus, setDeleteBus] = useState<Bus | null>(null);
    const [editingDriverAssistant, setEditingDriverAssistant] = useState<Bus | null>(null);

    const busForm = useForm({
        number: '',
        name: '',
        bus_staff: [] as { trip_type: string; role: string; staff_name: string }[],
    });

    useEffect(() => {
        if (editingBus) {
            busForm.setData({
                number: editingBus.number,
                name: editingBus.name || '',
                bus_staff: editingBus.busStaff?.map(staff => ({
                    trip_type: staff.trip_type,
                    role: staff.role,
                    staff_name: staff.staff_name,
                })) || [],
            });
            setShowDialog(true);
        } else {
            busForm.reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingBus]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBus) {
            busForm.put(update({ bus: editingBus.id }).url, {
                onSuccess: () => {
                    setEditingBus(null);
                    setShowDialog(false);
                    busForm.reset();
                },
            });
        } else {
            busForm.post(store().url, {
                onSuccess: () => {
                    setShowDialog(false);
                    busForm.reset();
                },
            });
        }
    };

    const handleDelete = (bus: Bus) => {
        router.delete(destroy({ bus: bus.id }).url);
        setDeleteBus(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Bus Management" />

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
                        <h1 className="text-2xl font-semibold">Bus Management</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage buses, drivers, and assistants
                        </p>
                    </div>
                    <Dialog open={showDialog} onOpenChange={(open) => {
                        setShowDialog(open);
                        if (!open) {
                            setEditingBus(null);
                            busForm.reset();
                        }
                    }}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add Bus
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>
                                    {editingBus ? 'Edit Bus' : 'Add New Bus'}
                                </DialogTitle>
                                <DialogDescription>
                                    {editingBus
                                        ? 'Update bus information'
                                        : 'Create a new bus for student transportation'}
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="number">Bus Number *</Label>
                                        <Input
                                            id="number"
                                            name="number"
                                            value={busForm.data.number}
                                            onChange={(e) => busForm.setData('number', e.target.value)}
                                            placeholder="e.g., KBB-001, Bus 1"
                                            required
                                            autoFocus
                                        />
                                        <InputError message={busForm.errors.number} />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="name">Bus Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={busForm.data.name}
                                            onChange={(e) => busForm.setData('name', e.target.value)}
                                            placeholder="Optional descriptive name"
                                        />
                                        <InputError message={busForm.errors.name} />
                                    </div>
                                    <div className="grid gap-4">
                                        <Label>Bus Staff Assignments</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Assign drivers and assistants for each trip type
                                        </p>

                                        {tripTypes.map((trip) => {
                                            const driverAssignment = busForm.data.bus_staff.find(
                                                (assignment) => assignment.trip_type === trip.value && assignment.role === 'driver'
                                            );
                                            const assistantAssignment = busForm.data.bus_staff.find(
                                                (assignment) => assignment.trip_type === trip.value && assignment.role === 'assistant'
                                            );

                                            return (
                                                <div key={trip.value} className="grid gap-3 p-4 border rounded-lg">
                                                    <h4 className="font-medium text-sm">{trip.label}</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor={`driver_${trip.value}`} className="text-xs">Driver</Label>
                                                            <Input
                                                                id={`driver_${trip.value}`}
                                                                value={driverAssignment?.staff_name || ''}
                                                                onChange={(e) => {
                                                                    const newStaff = [...busForm.data.bus_staff];
                                                                    const existingIndex = newStaff.findIndex(
                                                                        (assignment) => assignment.trip_type === trip.value && assignment.role === 'driver'
                                                                    );

                                                                    if (e.target.value) {
                                                                        if (existingIndex >= 0) {
                                                                            newStaff[existingIndex].staff_name = e.target.value;
                                                                        } else {
                                                                            newStaff.push({
                                                                                trip_type: trip.value,
                                                                                role: 'driver',
                                                                                staff_name: e.target.value,
                                                                            });
                                                                        }
                                                                    } else {
                                                                        if (existingIndex >= 0) {
                                                                            newStaff.splice(existingIndex, 1);
                                                                        }
                                                                    }

                                                                    busForm.setData('bus_staff', newStaff);
                                                                }}
                                                                placeholder="Driver name"
                                                            />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor={`assistant_${trip.value}`} className="text-xs">Assistant</Label>
                                                            <Input
                                                                id={`assistant_${trip.value}`}
                                                                value={assistantAssignment?.staff_name || ''}
                                                                onChange={(e) => {
                                                                    const newStaff = [...busForm.data.bus_staff];
                                                                    const existingIndex = newStaff.findIndex(
                                                                        (assignment) => assignment.trip_type === trip.value && assignment.role === 'assistant'
                                                                    );

                                                                    if (e.target.value) {
                                                                        if (existingIndex >= 0) {
                                                                            newStaff[existingIndex].staff_name = e.target.value;
                                                                        } else {
                                                                            newStaff.push({
                                                                                trip_type: trip.value,
                                                                                role: 'assistant',
                                                                                staff_name: e.target.value,
                                                                            });
                                                                        }
                                                                    } else {
                                                                        if (existingIndex >= 0) {
                                                                            newStaff.splice(existingIndex, 1);
                                                                        }
                                                                    }

                                                                    busForm.setData('bus_staff', newStaff);
                                                                }}
                                                                placeholder="Assistant name"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <DialogFooter className="mt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => {
                                            setShowDialog(false);
                                            setEditingBus(null);
                                            busForm.reset();
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={busForm.processing}>
                                        {editingBus ? 'Update' : 'Create'} Bus
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bus className="h-5 w-5" />
                            All Buses
                        </CardTitle>
                        <CardDescription>
                            {buses.length} {buses.length === 1 ? 'bus' : 'buses'} registered
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        <th className="px-4 py-2 text-left text-sm font-medium w-12"></th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Number</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Staff</th>
                                        <th className="px-4 py-2 text-left text-sm font-medium">Students</th>
                                        <th className="px-4 py-2 text-right text-sm font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {buses.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="px-4 py-8 text-center text-muted-foreground"
                                            >
                                                No buses registered yet
                                            </td>
                                        </tr>
                                    ) : (
                                        buses.map((bus) => (
                                            <>
                                                <tr 
                                                    key={bus.id} 
                                                    className="border-b cursor-pointer hover:bg-muted/50"
                                                    onClick={() => router.visit(show({ bus: bus.id }).url)}
                                                >
                                                    <td className="px-4 py-2">
                                                        <div className="flex items-center gap-2">
                                                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                                            <span className="text-xs text-muted-foreground">View Details</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 font-medium">{bus.number}</td>
                                                    <td className="px-4 py-2 text-muted-foreground">
                                                        {bus.name || '-'}
                                                    </td>
                                                    <td className="px-4 py-2 text-muted-foreground">
                                                        <div className="text-xs">
                                                            {bus.busStaff && bus.busStaff.length > 0 ? (
                                                                <div className="space-y-1">
                                                                    {tripTypes.slice(0, 2).map((trip) => {
                                                                        const driver = bus.busStaff.find(s => s.trip_type === trip.value && s.role === 'driver');
                                                                        const assistant = bus.busStaff.find(s => s.trip_type === trip.value && s.role === 'assistant');
                                                                        return (
                                                                            <div key={trip.value} className="flex gap-2">
                                                                                <span className="font-medium">{trip.label.split(' ')[1]}:</span>
                                                                                <span>{driver?.staff_name || 'N/A'}</span>
                                                                                <span className="text-muted-foreground">/</span>
                                                                                <span>{assistant?.staff_name || 'N/A'}</span>
                                                                            </div>
                                                                        );
                                                                    })}
                                                                </div>
                                                            ) : (
                                                                'No staff assigned'
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <Users className="h-4 w-4" />
                                                            {bus.students_count || 0} student
                                                            {(bus.students_count || 0) !== 1 ? 's' : ''}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setDeleteBus(bus);
                                                                }}
                                                                disabled={(bus.students_count || 0) > 0}
                                                                title={
                                                                    (bus.students_count || 0) > 0
                                                                        ? 'Cannot delete bus with students'
                                                                        : 'Delete bus'
                                                                }
                                                            >
                                                                <Trash2 className="h-4 w-4 text-destructive" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* Delete Confirmation Dialog */}
                {deleteBus && (
                    <Dialog open={!!deleteBus} onOpenChange={(open) => !open && setDeleteBus(null)}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Bus</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete bus "{deleteBus.number}"? This action cannot be undone.
                                    {(deleteBus.students_count || 0) > 0 && (
                                        <span className="block mt-2 text-red-600 dark:text-red-400">
                                            This bus has {deleteBus.students_count} student
                                            {(deleteBus.students_count || 0) !== 1 ? 's' : ''} assigned and cannot be deleted.
                                        </span>
                                    )}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setDeleteBus(null)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => handleDelete(deleteBus)}
                                    disabled={(deleteBus.students_count || 0) > 0}
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