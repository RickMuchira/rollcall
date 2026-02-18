import { Head, router, useForm, usePage } from '@inertiajs/react';
import { useState, useRef, useEffect } from 'react';
import { Bus, Users, User, Printer, Download, ArrowLeft, Phone, Mail, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { index as busesIndex, edit, update } from '@/routes/buses';

interface Bus {
    id: number;
    number: string;
    name?: string;
    students: Student[];
    busStaff?: BusStaff[];
    driver_name?: string;
    assistant_name?: string;
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

interface Props {
    bus: Bus;
}

const tripTypes = [
    { value: 'trip_1_morning', label: 'Trip 1 Morning', startTime: '06:00', endTime: '07:00' },
    { value: 'trip_2_morning', label: 'Trip 2 Morning', startTime: '07:00', endTime: '08:30' },
    { value: 'trip_1_evening', label: 'Trip 1 Evening', startTime: '15:00', endTime: '16:00' },
    { value: 'trip_2_evening', label: 'Trip 2 Evening', startTime: '16:00', endTime: '17:30' },
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
    {
        title: 'Bus Details',
        href: '#',
    },
];

export default function BusShow({ bus }: Props) {
    const { flash } = usePage().props as { flash?: { success?: string } };
    const printRef = useRef<HTMLDivElement>(null);
    
    // State to track current time for real-time display
    const [currentTime, setCurrentTime] = useState(new Date());
    
    // Form for updating bus staff assignments
    const busStaffForm = useForm({
        bus_staff: [] as { trip_type: string; role: string; staff_name: string }[],
    });

    // Initialize form data with existing staff assignments
    useEffect(() => {
        const initialStaff = [];
        if (bus.busStaff) {
            for (const staff of bus.busStaff) {
                initialStaff.push({
                    trip_type: staff.trip_type,
                    role: staff.role,
                    staff_name: staff.staff_name,
                });
            }
        }
        busStaffForm.setData('bus_staff', initialStaff);
    }, [bus]);

    // Update current time every minute
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000); // Update every minute

        return () => clearInterval(timer);
    }, []);

    const handlePrint = () => {
        const printContent = printRef.current;
        if (!printContent) return;

        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent.innerHTML;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reload to restore React state
    };

    const handleStaffUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        busStaffForm.put(update({ bus: bus.id }).url, {
            onSuccess: () => {
                // Refresh the page to update the display
                router.reload();
            },
        });
    };

    // Safely access busStaff property with fallback
    const getBusStaff = () => bus.busStaff || [];

    const handleDownload = () => {
        const staffByTrip = tripTypes.reduce((acc, trip) => {
            acc[trip.label] = {
                driver: getBusStaff().find(s => s.trip_type === trip.value && s.role === 'driver')?.staff_name || 'Not assigned',
                assistant: getBusStaff().find(s => s.trip_type === trip.value && s.role === 'assistant')?.staff_name || 'Not assigned',
            };
            return acc;
        }, {} as Record<string, { driver: string; assistant: string }>);

        const data = {
            bus: {
                number: bus.number,
                name: bus.name,
                staff: staffByTrip,
            },
            students: bus.students.map(student => ({
                name: student.name,
                grade: student.grade?.name || 'N/A',
                trip: student.pivot?.trip_type ? formatTripType(student.pivot.trip_type) : 'N/A',
            })),
            generatedAt: new Date().toLocaleString(),
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `bus-${bus.number}-rollcall.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Function to check if a trip is currently active based on time
    const isTripActive = (startTime: string, endTime: string): boolean => {
        const now = currentTime;
        const currentHours = now.getHours();
        const currentMinutes = now.getMinutes();
        
        // Convert time strings to numbers for comparison
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        
        // Create comparable time values (in minutes since midnight)
        const currentTimeInMinutes = currentHours * 60 + currentMinutes;
        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;
        
        return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
    };

    // Function to get the badge color based on whether the trip is active
    const getTripStatusColor = (isActive: boolean) => {
        return isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    };

    const getTripBadgeColor = (tripType: string) => {
        switch (tripType) {
            case 'trip_1_morning':
            case 'trip_2_morning':
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
            case 'trip_1_evening':
            case 'trip_2_evening':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${bus.number} - Bus Details`} />

            <div ref={printRef} className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4 print:p-0 print:overflow-visible">
                {flash?.success && (
                    <div className="rounded-md bg-green-50 p-4 text-sm text-green-800 dark:bg-green-900/20 dark:text-green-400 print:hidden">
                        {flash.success}
                    </div>
                )}

                {/* Header Section */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-6 text-white shadow-lg print:bg-white print:text-black">
                    <div className="absolute inset-0 bg-black/10 print:hidden"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => router.visit(busesIndex().url)}
                                    className="text-white hover:bg-white/20 print:hidden"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Buses
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => router.visit(edit({ bus: bus.id }).url)}
                                    className="text-white hover:bg-white/20 print:hidden"
                                >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Edit
                                </Button>
                            </div>
                            <div className="flex gap-2 print:hidden">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handlePrint}
                                    className="bg-white/20 text-white hover:bg-white/30"
                                >
                                    <Printer className="mr-2 h-4 w-4" />
                                    Print
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={handleDownload}
                                    className="bg-white/20 text-white hover:bg-white/30"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6">
                            <div className="flex items-center gap-3 mb-2">
                                <Bus className="h-8 w-8" />
                                <h1 className="text-3xl font-bold">{bus.number}</h1>
                                {bus.name && <span className="text-xl opacity-90">• {bus.name}</span>}
                            </div>
                            
                            {/* Staff Assignment Cards */}
                            <form onSubmit={handleStaffUpdate}>
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {tripTypes.map((trip) => {
                                        const driverAssignment = busStaffForm.data.bus_staff.find(
                                            (assignment) => assignment.trip_type === trip.value && assignment.role === 'driver'
                                        );
                                        const assistantAssignment = busStaffForm.data.bus_staff.find(
                                            (assignment) => assignment.trip_type === trip.value && assignment.role === 'assistant'
                                        );
                                        
                                        const isActive = isTripActive(trip.startTime, trip.endTime);
                                        return (
                                            <div key={trip.value} className={`rounded-lg p-3 ${isActive ? 'bg-green-500/20' : 'bg-white/10'}`}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <h3 className="font-semibold text-sm">{trip.label}</h3>
                                                    <Badge className={getTripStatusColor(isActive)}>
                                                        {isActive ? 'Active Now' : 'Inactive'}
                                                    </Badge>
                                                </div>
                                                <div className="space-y-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        <div className="flex-1">
                                                            <Label htmlFor={`driver_${trip.value}`} className="text-xs mb-1">Driver</Label>
                                                            <Input
                                                                id={`driver_${trip.value}`}
                                                                value={driverAssignment?.staff_name || ''}
                                                                onChange={(e) => {
                                                                    const newStaff = [...busStaffForm.data.bus_staff];
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

                                                                    busStaffForm.setData('bus_staff', newStaff);
                                                                }}
                                                                placeholder="Driver name"
                                                                className="text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <User className="h-4 w-4" />
                                                        <div className="flex-1">
                                                            <Label htmlFor={`assistant_${trip.value}`} className="text-xs mb-1">Assistant</Label>
                                                            <Input
                                                                id={`assistant_${trip.value}`}
                                                                value={assistantAssignment?.staff_name || ''}
                                                                onChange={(e) => {
                                                                    const newStaff = [...busStaffForm.data.bus_staff];
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

                                                                    busStaffForm.setData('bus_staff', newStaff);
                                                                }}
                                                                placeholder="Assistant name"
                                                                className="text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                
                                <div className="mt-4 flex justify-end">
                                    <Button type="submit" disabled={busStaffForm.processing} className="bg-white text-blue-600 hover:bg-gray-100">
                                        Save Staff Assignments
                                    </Button>
                                </div>
                            </form>
                            
                            <div className="mt-4 flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                <span className="text-lg">{bus.students.length} Students</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Split Layout */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Students Section */}
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-blue-600" />
                                Student Roster
                            </CardTitle>
                            <CardDescription>
                                Students assigned to this bus
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {bus.students.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <Users className="h-12 w-12 text-muted-foreground mb-4" />
                                    <p className="text-muted-foreground">No students assigned to this bus yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {bus.students.map((student, index) => (
                                        <div
                                            key={student.id}
                                            className="flex items-center justify-between p-4 rounded-lg border bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-md transition-shadow"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                                        {student.name}
                                                    </p>
                                                    {student.grade && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {student.grade.name}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <Badge
                                                variant="secondary"
                                                className={getTripBadgeColor(student.pivot?.trip_type || '')}
                                            >
                                                {student.pivot?.trip_type ?
                                                    formatTripType(student.pivot.trip_type) :
                                                    'No Trip'
                                                }
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Stats Section */}
                    <Card className="flex-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-green-600" />
                                Bus Information
                            </CardTitle>
                            <CardDescription>
                                Additional bus information and statistics
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Driver & Assistant Info */}
                                <div className="space-y-4">
                                    <div className="rounded-lg border bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                                    Driver
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Bus operator
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                                            {getBusStaff().find(s => s.role === 'driver')?.staff_name || 'Not assigned'}
                                        </p>
                                    </div>

                                    <div className="rounded-lg border bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300">
                                                <User className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                                                    Assistant
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Bus assistant
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-base font-medium text-gray-900 dark:text-gray-100">
                                            {getBusStaff().find(s => s.role === 'assistant')?.staff_name || 'Not assigned'}
                                        </p>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="rounded-lg border bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4">
                                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">
                                        Quick Stats
                                    </h4>
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <div>
                                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                                {bus.students.length}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Total Students</p>
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {bus.students.filter(s => s.pivot?.trip_type?.includes('morning')).length}
                                            </p>
                                            <p className="text-sm text-muted-foreground">Morning Trips</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}