<?php

namespace Database\Seeders;

use App\Models\Bus;
use App\Models\Grade;
use App\Models\Student;
use Illuminate\Database\Seeder;

class RollcallSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create grades
        $grades = Grade::factory()->count(5)->create();

        // Create buses
        $buses = Bus::factory()->count(3)->create();

        // Create students without transport
        Student::factory()->count(10)->withoutTransport()->create([
            'grade_id' => fn () => $grades->random()->id,
        ]);

        // Create students with transport
        Student::factory()->count(15)->withTransport()->create([
            'grade_id' => fn () => $grades->random()->id,
        ])->each(function ($student) use ($buses) {
            $bus = $buses->random();
            $tripTypes = ['trip_1_morning', 'trip_2_morning'];
            foreach ($tripTypes as $tripType) {
                $student->buses()->attach($bus->id, ['trip_type' => $tripType]);
            }
        });
    }
}
