<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBusRequest;
use App\Http\Requests\UpdateBusRequest;
use App\Models\Bus;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class BusController extends Controller
{
    /**
     * Display a listing of the buses.
     */
    public function index(): Response
    {
        $buses = Bus::with(['students' => function ($query) {
            $query->with('grade')->orderBy('name');
        }, 'busStaff'])->withCount('students')->orderBy('number')->get();

        return Inertia::render('buses/index', [
            'buses' => $buses,
        ]);
    }

    /**
     * Show the form for creating a new bus.
     */
    public function create(): Response
    {
        return Inertia::render('buses/create');
    }

    /**
     * Store a newly created bus in storage.
     */
    public function store(StoreBusRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $busStaff = $validated['bus_staff'] ?? [];
        unset($validated['bus_staff']);

        $bus = Bus::create($validated);

        // Create bus staff assignments
        foreach ($busStaff as $staff) {
            $bus->busStaff()->create($staff);
        }

        return redirect()->route('buses.index')
            ->with('success', 'Bus created successfully.');
    }

    /**
     * Display the specified bus.
     */
    public function show(Bus $bus): Response
    {
        $bus->load(['students' => function ($query) {
            $query->with('grade')->orderBy('name');
        }, 'busStaff']);

        return Inertia::render('buses/show', [
            'bus' => $bus,
        ]);
    }

    /**
     * Show the form for editing the specified bus.
     */
    public function edit(Bus $bus): Response
    {
        return Inertia::render('buses/edit', [
            'bus' => $bus,
        ]);
    }

    /**
     * Update the specified bus in storage.
     */
    public function update(UpdateBusRequest $request, Bus $bus): RedirectResponse
    {
        $validated = $request->validated();
        $busStaff = $validated['bus_staff'] ?? [];
        unset($validated['bus_staff']);

        $bus->update($validated);

        // Delete existing bus staff and create new ones
        $bus->busStaff()->delete();
        foreach ($busStaff as $staff) {
            $bus->busStaff()->create($staff);
        }

        return redirect()->route('buses.index')
            ->with('success', 'Bus updated successfully.');
    }

    /**
     * Remove the specified bus from storage.
     */
    public function destroy(Bus $bus): RedirectResponse
    {
        $bus->delete();

        return redirect()->route('buses.index')
            ->with('success', 'Bus deleted successfully.');
    }
}
