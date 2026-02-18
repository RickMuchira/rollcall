<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGradeRequest;
use App\Http\Requests\UpdateGradeRequest;
use App\Models\Grade;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class GradeController extends Controller
{
    /**
     * Display a listing of grades.
     */
    public function index(): Response
    {
        $grades = Grade::withCount('students')->orderBy('name')->get();

        return Inertia::render('grades/index', [
            'grades' => $grades,
        ]);
    }

    /**
     * Store a newly created grade in storage.
     */
    public function store(StoreGradeRequest $request): RedirectResponse
    {
        Grade::create($request->validated());

        return redirect()->route('grades.index')
            ->with('success', 'Grade created successfully.');
    }

    /**
     * Update the specified grade in storage.
     */
    public function update(UpdateGradeRequest $request, Grade $grade): RedirectResponse
    {
        $grade->update($request->validated());

        return redirect()->route('grades.index')
            ->with('success', 'Grade updated successfully.');
    }

    /**
     * Remove the specified grade from storage.
     */
    public function destroy(Grade $grade): RedirectResponse
    {
        // Check if grade has students
        if ($grade->students()->count() > 0) {
            return redirect()->route('grades.index')
                ->with('error', 'Cannot delete grade that has students assigned.');
        }

        $grade->delete();

        return redirect()->route('grades.index')
            ->with('success', 'Grade deleted successfully.');
    }
}
