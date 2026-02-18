<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBusRequest;
use App\Http\Requests\StoreGradeRequest;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Bus;
use App\Models\Grade;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class RollcallController extends Controller
{
    /**
     * Display the rollcall management system.
     */
    public function index(): Response
    {
        $students = Student::with(['grade', 'buses'])->get()->map(function ($student) {
            return [
                'id' => $student->id,
                'name' => $student->name,
                'grade_id' => $student->grade_id,
                'transport' => $student->transport,
                'grade' => $student->grade,
                'buses' => $student->buses->map(function ($bus) {
                    return [
                        'id' => $bus->id,
                        'number' => $bus->number,
                        'name' => $bus->name,
                        'pivot' => [
                            'trip_type' => $bus->pivot->trip_type,
                        ],
                    ];
                }),
            ];
        });
        $grades = Grade::orderBy('name')->get();
        $buses = Bus::orderBy('number')->get();

        return Inertia::render('rollcall/index', [
            'students' => $students,
            'grades' => $grades,
            'buses' => $buses,
        ]);
    }

    /**
     * Store a newly created student in storage.
     */
    public function store(StoreStudentRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Handle grade creation if needed
        $gradeId = $validated['grade_id'] ?? null;
        if (! $gradeId && isset($validated['grade_name'])) {
            $grade = Grade::create(['name' => $validated['grade_name']]);
            $gradeId = $grade->id;
        }

        // Create student
        $student = Student::create([
            'name' => $validated['name'],
            'grade_id' => $gradeId,
            'transport' => $validated['transport'] ?? false,
        ]);

        // Attach bus and trips if transport is enabled
        if (($validated['transport'] ?? false) && isset($validated['bus_id']) && ! empty($validated['trip_types'])) {
            $busId = $validated['bus_id'];
            foreach ($validated['trip_types'] as $tripType) {
                $student->buses()->attach($busId, ['trip_type' => $tripType]);
            }
        }

        return redirect()->route('rollcall.index')
            ->with('success', 'Student created successfully.');
    }

    /**
     * Update the specified student in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student): RedirectResponse
    {
        $validated = $request->validated();

        // Handle grade creation if needed
        $gradeId = $validated['grade_id'] ?? $student->grade_id;
        if (! $gradeId && isset($validated['grade_name'])) {
            $grade = Grade::create(['name' => $validated['grade_name']]);
            $gradeId = $grade->id;
        }

        // Update student
        $student->update([
            'name' => $validated['name'] ?? $student->name,
            'grade_id' => $gradeId,
            'transport' => $validated['transport'] ?? $student->transport,
        ]);

        // Update bus assignments
        $student->buses()->detach();
        if (($validated['transport'] ?? false) && isset($validated['bus_id']) && ! empty($validated['trip_types'])) {
            $busId = $validated['bus_id'];
            foreach ($validated['trip_types'] as $tripType) {
                $student->buses()->attach($busId, ['trip_type' => $tripType]);
            }
        }

        return redirect()->route('rollcall.index')
            ->with('success', 'Student updated successfully.');
    }

    /**
     * Remove the specified student from storage.
     */
    public function destroy(Student $student): RedirectResponse
    {
        $student->delete();

        return redirect()->route('rollcall.index')
            ->with('success', 'Student deleted successfully.');
    }

    /**
     * Store a newly created grade.
     */
    public function storeGrade(StoreGradeRequest $request): RedirectResponse
    {
        Grade::create($request->validated());

        return redirect()->route('rollcall.index')
            ->with('success', 'Grade created successfully.');
    }

    /**
     * Store a newly created bus.
     */
    public function storeBus(StoreBusRequest $request): RedirectResponse
    {
        Bus::create($request->validated());

        return redirect()->route('rollcall.index')
            ->with('success', 'Bus created successfully.');
    }

    /**
     * Display the print view for rollcall lists.
     */
    public function print(Request $request): Response
    {
        $grouped = $request->query('grouped', 'false') === 'true';
        $gradeFilter = $request->query('grade');
        $busFilter = $request->query('bus');

        $query = Student::with(['grade', 'buses']);

        if ($gradeFilter) {
            $query->where('grade_id', $gradeFilter);
        }

        if ($busFilter) {
            $query->whereHas('buses', function ($q) use ($busFilter) {
                $q->where('buses.id', $busFilter);
            });
        }

        $students = $query->get()->map(function ($student) {
            return [
                'id' => $student->id,
                'name' => $student->name,
                'transport' => $student->transport,
                'grade' => $student->grade,
                'buses' => $student->buses->map(function ($bus) {
                    return [
                        'id' => $bus->id,
                        'number' => $bus->number,
                        'name' => $bus->name,
                        'pivot' => [
                            'trip_type' => $bus->pivot->trip_type,
                        ],
                    ];
                }),
            ];
        });

        return Inertia::render('rollcall/print', [
            'students' => $students,
            'grouped' => $grouped,
            'grades' => Grade::orderBy('name')->get(),
            'buses' => Bus::orderBy('number')->get(),
        ]);
    }
}
