import { Head } from '@inertiajs/react';

interface Student {
    id: number;
    name: string;
    grade: string;
    transport: boolean;
    busTrip: string;
}

interface RollcallPrintProps {
    students: Student[];
    grouped?: boolean;
}

export default function RollcallPrint({ students = [], grouped = false }: RollcallPrintProps) {
    // Group students by bus trip if grouped is true
    const groupedStudents: Record<string, Student[]> = {};
    
    if (grouped && students.length > 0) {
        students.forEach(student => {
            if (student.transport && student.busTrip) {
                if (!groupedStudents[student.busTrip]) {
                    groupedStudents[student.busTrip] = [];
                }
                groupedStudents[student.busTrip].push(student);
            } else {
                if (!groupedStudents['No Transport']) {
                    groupedStudents['No Transport'] = [];
                }
                groupedStudents['No Transport'].push(student);
            }
        });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Head title="Rollcall Print View" />
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Rollcall Print View</h1>
                <button 
                    onClick={() => window.print()}
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Print List
                </button>
            </div>

            {grouped ? (
                // Grouped view by bus trip
                Object.entries(groupedStudents).map(([trip, tripStudents]) => (
                    <div key={trip} className="mb-8 print:break-inside-avoid">
                        <h2 className="text-2xl font-semibold mb-4">{trip} Students</h2>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {tripStudents.map((student) => (
                                        <tr key={student.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">{student.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))
            ) : (
                // Individual student list
                <div>
                    <h2 className="text-2xl font-semibold mb-4">All Students</h2>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transport</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Trip</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{student.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{student.grade}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{student.transport ? 'Yes' : 'No'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{student.transport ? student.busTrip : '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}