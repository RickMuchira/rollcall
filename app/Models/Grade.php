<?php

namespace App\Models;

use Database\Factories\GradeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Grade extends Model
{
    use HasFactory;

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory()
    {
        return GradeFactory::new();
    }

    protected $fillable = [
        'name',
    ];

    /**
     * Get the students for this grade.
     */
    public function students(): HasMany
    {
        return $this->hasMany(Student::class);
    }
}
