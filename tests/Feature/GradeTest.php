<?php

use App\Models\Grade;
use App\Models\Student;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\assertDatabaseMissing;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('displays the grades index page', function () {
    Grade::factory()->count(3)->create();

    actingAs($this->user)
        ->get(route('grades.index'))
        ->assertSuccessful()
        ->assertInertia(fn ($page) => $page
            ->component('grades/index')
            ->has('grades', 3)
        );
});

it('creates a new grade', function () {
    actingAs($this->user)
        ->post(route('grades.store'), [
            'name' => 'Grade 10',
        ])
        ->assertRedirect(route('grades.index'))
        ->assertSessionHas('success');

    assertDatabaseHas('grades', [
        'name' => 'Grade 10',
    ]);
});

it('validates grade name is required', function () {
    actingAs($this->user)
        ->post(route('grades.store'), [])
        ->assertSessionHasErrors(['name']);
});

it('validates grade name is unique', function () {
    Grade::factory()->create(['name' => 'Grade 5']);

    actingAs($this->user)
        ->post(route('grades.store'), [
            'name' => 'Grade 5',
        ])
        ->assertSessionHasErrors(['name']);
});

it('updates an existing grade', function () {
    $grade = Grade::factory()->create(['name' => 'Old Name']);

    actingAs($this->user)
        ->put(route('grades.update', $grade), [
            'name' => 'New Name',
        ])
        ->assertRedirect(route('grades.index'))
        ->assertSessionHas('success');

    assertDatabaseHas('grades', [
        'id' => $grade->id,
        'name' => 'New Name',
    ]);
});

it('validates grade name is unique when updating', function () {
    Grade::factory()->create(['name' => 'Existing Grade']);
    $grade = Grade::factory()->create(['name' => 'My Grade']);

    actingAs($this->user)
        ->put(route('grades.update', $grade), [
            'name' => 'Existing Grade',
        ])
        ->assertSessionHasErrors(['name']);
});

it('allows updating grade with same name', function () {
    $grade = Grade::factory()->create(['name' => 'My Grade']);

    actingAs($this->user)
        ->put(route('grades.update', $grade), [
            'name' => 'My Grade',
        ])
        ->assertRedirect(route('grades.index'))
        ->assertSessionHas('success');
});

it('deletes a grade without students', function () {
    $grade = Grade::factory()->create();

    actingAs($this->user)
        ->delete(route('grades.destroy', $grade))
        ->assertRedirect(route('grades.index'))
        ->assertSessionHas('success');

    assertDatabaseMissing('grades', [
        'id' => $grade->id,
    ]);
});

it('prevents deleting grade with students', function () {
    $grade = Grade::factory()->create();
    Student::factory()->create(['grade_id' => $grade->id]);

    actingAs($this->user)
        ->delete(route('grades.destroy', $grade))
        ->assertRedirect(route('grades.index'))
        ->assertSessionHas('error');

    assertDatabaseHas('grades', [
        'id' => $grade->id,
    ]);
});

it('requires authentication to access grades pages', function () {
    $this->get(route('grades.index'))
        ->assertRedirect(route('login'));

    $this->post(route('grades.store'), [])
        ->assertRedirect(route('login'));
});
