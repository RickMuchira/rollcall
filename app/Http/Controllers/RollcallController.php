<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RollcallController extends Controller
{
    /**
     * Display the rollcall management system.
     */
    public function index()
    {
        $students = Student::all();
        
        return Inertia::render('Rollcall', [
            'students' => $students
        ]);
    }

    /**
     * Store a newly created student in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'grade' => 'required|string|max:255',
            'transport' => 'boolean',
            'busTrip' => 'nullable|string|max:255'
        ]);

        // Adjust field names to match our model
        $studentData = [
            'name' => $validatedData['name'],
            'grade' => $validatedData['grade'],
            'transport' => $validatedData['transport'] ?? false,
            'bus_trip' => $validatedData['busTrip']
        ];

        $student = Student::create($studentData);

        return response()->json(['success' => true, 'student' => $student]);
    }

    /**
     * Display the print view for rollcall lists.
     */
    public function print(Request $request)
    {
        $students = Student::all();
        $grouped = $request->query('grouped', 'false') === 'true';

        return Inertia::render('Rollcall/Print', [
            'students' => $students,
            'grouped' => $grouped
        ]);
    }
}