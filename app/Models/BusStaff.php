<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BusStaff extends Model
{
    protected $fillable = [
        'bus_id',
        'trip_type',
        'role',
        'staff_name',
    ];

    protected $casts = [
        'trip_type' => 'string',
        'role' => 'string',
    ];

    public function bus(): BelongsTo
    {
        return $this->belongsTo(Bus::class);
    }
}
