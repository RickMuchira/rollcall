<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('student_bus_trip', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained()->cascadeOnDelete();
            $table->foreignId('bus_id')->constrained()->cascadeOnDelete();
            $table->enum('trip_type', ['trip_1_morning', 'trip_2_morning', 'trip_1_evening', 'trip_2_evening']);
            $table->timestamps();

            $table->unique(['student_id', 'bus_id', 'trip_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_bus_trip');
    }
};
