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
        Schema::create('bus_staff', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bus_id')->constrained()->onDelete('cascade');
            $table->enum('trip_type', ['trip_1_morning', 'trip_1_evening', 'trip_2_morning', 'trip_2_evening']);
            $table->enum('role', ['driver', 'assistant']);
            $table->string('staff_name');
            $table->timestamps();

            $table->unique(['bus_id', 'trip_type', 'role']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bus_staff');
    }
};
