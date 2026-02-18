<?php

namespace App\Models;

use Database\Factories\StudentFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Student extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return StudentFactory::new();
    }

    protected $fillable = [
        'name',
        'grade_id',
        'transport',
    ];

    protected function casts(): array
    {
        return [
            'transport' => 'boolean',
        ];
    }

    /**
     * Get the grade that the student belongs to.
     */
    public function grade(): BelongsTo
    {
        return $this->belongsTo(Grade::class);
    }

    /**
     * Get the buses assigned to this student.
     */
    public function buses(): BelongsToMany
    {
        return $this->belongsToMany(Bus::class, 'student_bus_trip')
            ->withPivot('trip_type')
            ->withTimestamps();
    }
}
