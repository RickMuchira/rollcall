<?php

namespace Database\Factories;

use App\Models\Grade;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'grade_id' => Grade::factory(),
            'transport' => fake()->boolean(30),
        ];
    }

    /**
     * Indicate that the student uses transportation.
     */
    public function withTransport(): static
    {
        return $this->state(fn (array $attributes) => [
            'transport' => true,
        ]);
    }

    /**
     * Indicate that the student does not use transportation.
     */
    public function withoutTransport(): static
    {
        return $this->state(fn (array $attributes) => [
            'transport' => false,
        ]);
    }
}
