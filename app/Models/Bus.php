<?php

namespace App\Models;

use Database\Factories\BusFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
}
