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
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn(['grade', 'bus_trip']);
            $table->foreignId('grade_id')->nullable()->after('name')->constrained()->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropForeign(['grade_id']);
            $table->dropColumn('grade_id');
            $table->string('grade')->after('name');
            $table->string('bus_trip')->nullable()->after('transport');
        });
    }
};
