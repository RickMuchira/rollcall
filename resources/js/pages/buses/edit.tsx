import { Form, Head, router, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Bus, Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { index as busesIndex, show, update } from '@/routes/buses';

interface Bus {
    id: number;
    number: string;
    name?: string;
    students: Student[];
    busStaff?: BusStaff[];
}

interface BusStaff {
    id?: number;
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

interface Props {
    bus: Bus;
}

const tripTypes = [
    { value: 'trip_1_morning', label: 'Trip 1 Morning', startTime: '06:00', endTime: '07:00' },
    { value: 'trip_2_morning', label: 'Trip 2 Morning', startTime: '07:00', endTime: '08:30' },
    { value: 'trip_1_evening', label: 'Trip 1 Evening', startTime: '15:00', endTime: '16:00' },
    { value: 'trip_2_evening', label: 'Trip 2 Evening', startTime: '16:00', endTime: '17:30' },
];

const roleTypes = [
    { value: 'driver', label: 'Driver' },
    { value: 'assistant', label: 'Assistant' },
];

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Buses',
        href: busesIndex().url,
    },
    {
        title: 'Edit Bus',
        href: '#',
    },
];

export default function BusEdit({ bus }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string; error?: string } };

    const busForm = useForm({
        number: bus.number,
        name: bus.name || '',
        bus_staff: bus.busStaff || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        busForm.put(update({ bus: bus.id }).url, {
            onSuccess: () => {
                router.visit(show({ bus: bus.id }).url);
            },
        });
    };

    const addNewStaffAssignment = () => {
        const newStaff = [...busForm.data.bus_staff];
        newStaff.push({
            trip_type: 'trip_1_morning',
            role: 'driver',
            staff_name: '',
        });
        busForm.setData('bus_staff', newStaff);
    };

    const updateStaffAssignment = (index: number, field: keyof BusStaff, value: string) => {
        const newStaff = [...busForm.data.bus_staff];
        newStaff[index] = {
            ...newStaff[index],
            [field]: value
        };
        busForm.setData('bus_staff', newStaff);
    };

    const removeStaffAssignment = (index: number) => {
        const newStaff = [...busForm.data.bus_staff];
        newStaff.splice(index, 1);
        busForm.setData('bus_staff', newStaff);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${bus.number} - Bus Details`} />

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

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.visit(show({ bus: bus.id }).url)}
                        className="hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Bus
                    </Button>
                </div>

                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bus className="h-5 w-5 text-blue-600" />
                            Edit Bus Information
                        </CardTitle>
                        <CardDescription>
                            Update bus number, name, and staff assignments for each trip
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="number">Bus Number *</Label>
                                        <Input
                                            id="number"
                                            name="number"
                                            value={busForm.data.number}
                                            onChange={(e) => busForm.setData('number', e.target.value)}
                                            placeholder="e.g., KBB-001, Bus 1"
                                            required
                                            disabled // Only allow editing the name, not the number
                                            className="opacity-50"
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
                                </div>

                                <div className="grid gap-4">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <Label>Bus Staff Assignments</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Assign drivers and assistants for each trip type
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={addNewStaffAssignment}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Assignment
                                        </Button>
                                    </div>

                                    {busForm.data.bus_staff.length === 0 ? (
                                        <div className="text-center py-4 text-muted-foreground">
                                            No staff assignments yet. Click "Add Assignment" to create one.
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {busForm.data.bus_staff.map((staff, index) => (
                                                <div key={index} className="grid gap-3 p-4 border rounded-lg">
                                                    <div className="flex justify-between items-center">
                                                        <h4 className="font-medium text-sm">Staff Assignment #{index + 1}</h4>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => removeStaffAssignment(index)}
                                                            className="text-destructive hover:text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                        <div className="grid gap-2">
                                                            <Label htmlFor={`trip_type_${index}`} className="text-xs">Trip Type</Label>
                                                            <select
                                                                id={`trip_type_${index}`}
                                                                value={staff.trip_type}
                                                                onChange={(e) => updateStaffAssignment(index, 'trip_type', e.target.value)}
                                                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                {tripTypes.map((trip) => (
                                                                    <option key={trip.value} value={trip.value}>
                                                                        {trip.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor={`role_${index}`} className="text-xs">Role</Label>
                                                            <select
                                                                id={`role_${index}`}
                                                                value={staff.role}
                                                                onChange={(e) => updateStaffAssignment(index, 'role', e.target.value)}
                                                                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                                            >
                                                                {roleTypes.map((role) => (
                                                                    <option key={role.value} value={role.value}>
                                                                        {role.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label htmlFor={`staff_name_${index}`} className="text-xs">Staff Name</Label>
                                                            <Input
                                                                id={`staff_name_${index}`}
                                                                value={staff.staff_name}
                                                                onChange={(e) => updateStaffAssignment(index, 'staff_name', e.target.value)}
                                                                placeholder="Staff member name"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit(show({ bus: bus.id }).url)}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={busForm.processing}>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}