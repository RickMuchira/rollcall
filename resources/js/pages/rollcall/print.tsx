import { Head, router } from '@inertiajs/react';
import { Printer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { index as rollcallIndex, print as printRoute } from '@/routes/rollcall';

interface Grade {
    id: number;
    name: string;
}

interface Bus {
    id: number;
    number: string;
    name?: string;
}

interface StudentBus {
    id: number;
    number: string;
    name?: string;
    pivot: {
        trip_type: string;
    };
}

interface Student {
    id: number;
    name: string;
    grade?: Grade;
    transport: boolean;
    buses?: StudentBus[];
}

interface RollcallPrintProps {
    students: Student[];
    grouped?: boolean;
    grades?: Grade[];
    buses?: Bus[];
}

const tripTypeLabels: Record<string, string> = {
    trip_1_morning: 'Trip 1 Morning',
    trip_2_morning: 'Trip 2 Morning',
    trip_1_evening: 'Trip 1 Evening',
    trip_2_evening: 'Trip 2 Evening',
};

const formatTripType = (tripType: string): string => {
    return tripTypeLabels[tripType] || tripType;
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Rollcall',
        href: rollcallIndex().url,
    },
    {
        title: 'Print View',
        href: printRoute().url,
    },
];

export default function RollcallPrint({
    students = [],
    grouped = false,
    grades = [],
    buses = [],
}: RollcallPrintProps) {
    // Group students by bus and trip type if grouped is true
    const groupedStudents: Record<string, Student[]> = {};

    if (grouped && students.length > 0) {
        students.forEach((student) => {
            if (student.transport && student.buses && student.buses.length > 0) {
                student.buses.forEach((bus) => {
                    const key = `${bus.number} - ${formatTripType(bus.pivot.trip_type)}`;
                    if (!groupedStudents[key]) {
                        groupedStudents[key] = [];
                    }
                    groupedStudents[key].push(student);
                });
            } else {
                if (!groupedStudents['No Transport']) {
                    groupedStudents['No Transport'] = [];
                }
                groupedStudents['No Transport'].push(student);
            }
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rollcall Print View" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Rollcall Print View</h1>
                        <p className="text-muted-foreground mt-1">
                            {grouped ? 'Grouped by bus and trip' : 'Individual student list'}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => router.visit(rollcallIndex().url)}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Rollcall
                        </Button>
                        <Button onClick={() => window.print()}>
                            <Printer className="mr-2 h-4 w-4" />
                            Print List
                        </Button>
                    </div>
                </div>

                {grouped ? (
                    // Grouped view by bus and trip
                    <div className="space-y-8">
                        {Object.entries(groupedStudents).map(([groupKey, groupStudents]) => (
                            <div key={groupKey} className="print:break-inside-avoid">
                                <h2 className="text-xl font-semibold mb-4">{groupKey}</h2>
                                <div className="border rounded-lg overflow-hidden">
                                    <table className="w-full">
                                        <thead className="bg-muted">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                                                <th className="px-4 py-3 text-left text-sm font-medium">Grade</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {groupStudents.map((student) => (
                                                <tr key={student.id} className="border-t">
                                                    <td className="px-4 py-3 text-sm font-medium">
                                                        {student.name}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm">
                                                        {student.grade?.name || 'N/A'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Individual student list
                    <div>
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium">ID</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Grade</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Transport</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium">Bus & Trips</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={5}
                                                className="px-4 py-8 text-center text-muted-foreground"
                                            >
                                                No students found
                                            </td>
                                        </tr>
                                    ) : (
                                        students.map((student) => (
                                            <tr key={student.id} className="border-t">
                                                <td className="px-4 py-3 text-sm">{student.id}</td>
                                                <td className="px-4 py-3 text-sm font-medium">
                                                    {student.name}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {student.grade?.name || 'N/A'}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {student.transport ? 'Yes' : 'No'}
                                                </td>
                                                <td className="px-4 py-3 text-sm">
                                                    {student.transport && student.buses && student.buses.length > 0
                                                        ? student.buses
                                                              .map(
                                                                  (bus) =>
                                                                      `${bus.number} (${formatTripType(bus.pivot.trip_type)})`
                                                              )
                                                              .join(', ')
                                                        : '-'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
