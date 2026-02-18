<?php

use App\Models\Bus;
use App\Models\Grade;
use App\Models\Student;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('displays the rollcall index page', function () {
    actingAs($this->user)
        ->get(route('rollcall.index'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('rollcall/index')
            ->has('students')
            ->has('grades')
            ->has('buses')
        );
});

it('creates a new student without transport', function () {
    $grade = Grade::factory()->create();

    actingAs($this->user)
        ->post(route('rollcall.store'), [
            'name' => 'John Doe',
            'grade_id' => $grade->id,
            'transport' => false,
        ])
        ->assertRedirect(route('rollcall.index'))
        ->assertSessionHas('success');

    assertDatabaseHas('students', [
        'name' => 'John Doe',
        'grade_id' => $grade->id,
        'transport' => false,
    ]);
});

it('creates a new student with transport and bus assignment', function () {
    $grade = Grade::factory()->create();
    $bus = Bus::factory()->create();

    actingAs($this->user)
        ->post(route('rollcall.store'), [
            'name' => 'Jane Smith',
            'grade_id' => $grade->id,
            'transport' => true,
            'bus_id' => $bus->id,
            'trip_types' => ['trip_1_morning', 'trip_2_morning'],
        ])
        ->assertRedirect(route('rollcall.index'))
        ->assertSessionHas('success');

    $student = Student::where('name', 'Jane Smith')->first();

    expect($student)->not->toBeNull();
    expect($student->transport)->toBeTrue();
    expect($student->buses)->toHaveCount(2);
    expect($student->buses->pluck('id')->toArray())->toContain($bus->id);
});

it('creates a new grade when grade_name is provided', function () {
    actingAs($this->user)
        ->post(route('rollcall.store'), [
            'name' => 'Test Student',
            'grade_name' => 'New Grade Level',
            'transport' => false,
        ])
        ->assertRedirect(route('rollcall.index'))
        ->assertSessionHas('success');

    assertDatabaseHas('grades', [
        'name' => 'New Grade Level',
    ]);

    $grade = Grade::where('name', 'New Grade Level')->first();
    assertDatabaseHas('students', [
        'name' => 'Test Student',
        'grade_id' => $grade->id,
    ]);
});

it('updates an existing student', function () {
    $student = Student::factory()->create();
    $newGrade = Grade::factory()->create();

    actingAs($this->user)
        ->put(route('rollcall.update', $student), [
            'name' => 'Updated Name',
            'grade_id' => $newGrade->id,
            'transport' => false,
        ])
        ->assertRedirect(route('rollcall.index'))
        ->assertSessionHas('success');

    assertDatabaseHas('students', [
        'id' => $student->id,
        'name' => 'Updated Name',
        'grade_id' => $newGrade->id,
    ]);
});

it('deletes a student', function () {
    $student = Student::factory()->create();

    actingAs($this->user)
        ->delete(route('rollcall.destroy', $student))
        ->assertRedirect(route('rollcall.index'))
        ->assertSessionHas('success');

    assertDatabaseMissing('students', [
        'id' => $student->id,
    ]);
});

it('creates a new grade', function () {
    actingAs($this->user)
        ->post(route('rollcall.grades.store'), [
            'name' => 'Grade 13',
        ])
        ->assertRedirect(route('rollcall.index'))
        ->assertSessionHas('success');

    assertDatabaseHas('grades', [
        'name' => 'Grade 13',
    ]);
});

it('creates a new bus', function () {
    actingAs($this->user)
        ->post(route('rollcall.buses.store'), [
            'number' => 'BUS-999',
            'name' => 'Test Route',
        ])
        ->assertRedirect(route('rollcall.index'))
        ->assertSessionHas('success');

    assertDatabaseHas('buses', [
        'number' => 'BUS-999',
        'name' => 'Test Route',
    ]);
});

it('displays the print page', function () {
    Student::factory()->count(5)->create();

    actingAs($this->user)
        ->get(route('rollcall.print'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('rollcall/print')
            ->has('students')
            ->has('grouped')
        );
});

it('validates required fields when creating a student', function () {
    actingAs($this->user)
        ->post(route('rollcall.store'), [])
        ->assertSessionHasErrors(['name']);
});

it('validates bus_id is required when transport is enabled', function () {
    $grade = Grade::factory()->create();

    actingAs($this->user)
        ->post(route('rollcall.store'), [
            'name' => 'Test Student',
            'grade_id' => $grade->id,
            'transport' => true,
        ])
        ->assertSessionHasErrors(['bus_id']);
});

it('requires authentication to access rollcall pages', function () {
    $this->get(route('rollcall.index'))
        ->assertRedirect(route('login'));

    $this->post(route('rollcall.store'), [])
        ->assertRedirect(route('login'));
});
