import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Rollcall() {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        grade: '',
        transport: false,
        busTrip: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add student to the list
        const newStudent = {
            id: Date.now(),
            ...formData
        };
        setStudents(prev => [...prev, newStudent]);
        // Reset form
        setFormData({
            name: '',
            grade: '',
            transport: false,
            busTrip: ''
        });
    };

    // Function to handle printing
    const handlePrint = (grouped = false) => {
        // In a real application, you would navigate to the print page with the appropriate data
        // For now, we'll just log the action
        console.log(`Printing ${grouped ? 'grouped' : 'ungrouped'} list`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Head title="Rollcall System" />
            <h1 className="text-3xl font-bold mb-8">Rollcall Management System</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Add Student Form */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">Add New Student</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium mb-1">Student Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="grade" className="block text-sm font-medium mb-1">Grade</label>
                            <input
                                type="text"
                                id="grade"
                                name="grade"
                                value={formData.grade}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="transport"
                                name="transport"
                                checked={formData.transport}
                                onChange={handleInputChange}
                                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="transport" className="block text-sm font-medium">Uses Transportation</label>
                        </div>
                        
                        {formData.transport && (
                            <div>
                                <label htmlFor="busTrip" className="block text-sm font-medium mb-1">Bus Trip</label>
                                <select
                                    id="busTrip"
                                    name="busTrip"
                                    value={formData.busTrip}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Trip</option>
                                    <option value="Trip 1 Morning">Trip 1 Morning</option>
                                    <option value="Trip 2 Morning">Trip 2 Morning</option>
                                    <option value="Trip 1 Evening">Trip 1 Evening</option>
                                    <option value="Trip 2 Evening">Trip 2 Evening</option>
                                </select>
                            </div>
                        )}
                        
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Add Student
                        </button>
                    </form>
                </div>
                
                {/* Students List */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Student Roster</h2>
                        <div className="flex space-x-2">
                            <Link
                                href={`/rollcall/print?grouped=false`}
                                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                            >
                                Print Individual List
                            </Link>
                            <Link
                                href={`/rollcall/print?grouped=true`}
                                className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                            >
                                Print Grouped List
                            </Link>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transport</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Trip</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.grade}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.transport ? 'Yes' : 'No'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{student.transport ? student.busTrip : '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}