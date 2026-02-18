<?php

namespace App\Models;

use Database\Factories\BusFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bus extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return BusFactory::new();
    }

    protected $fillable = [
        'number',
        'name',
    ];

    /**
     * Get the students assigned to this bus.
     */
    public function students(): BelongsToMany
    {
        return $this->belongsToMany(Student::class, 'student_bus_trip')
            ->withPivot('trip_type')
            ->withTimestamps();
    }

    /**
     * Get the bus staff assignments.
     */
    public function busStaff(): HasMany
    {
        return $this->hasMany(BusStaff::class);
    }

    /**
     * Get the driver for a specific trip type.
     */
    public function getDriverForTrip(string $tripType): ?string
    {
        return $this->busStaff()
            ->where('trip_type', $tripType)
            ->where('role', 'driver')
            ->value('staff_name');
    }

    /**
     * Get the assistant for a specific trip type.
     */
    public function getAssistantForTrip(string $tripType): ?string
    {
        return $this->busStaff()
            ->where('trip_type', $tripType)
            ->where('role', 'assistant')
            ->value('staff_name');
    }

    /**
     * Get all staff organized by trip type.
     */
    public function getStaffByTrip(): array
    {
        $staff = [];
        $tripTypes = ['trip_1_morning', 'trip_1_evening', 'trip_2_morning', 'trip_2_evening'];

        foreach ($tripTypes as $tripType) {
            $staff[$tripType] = [
                'driver' => $this->getDriverForTrip($tripType),
                'assistant' => $this->getAssistantForTrip($tripType),
            ];
        }

        return $staff;
    }
}
