<?php

use App\Http\Controllers\BusController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\RollcallController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth'])->group(function () {
    Route::get('/rollcall', [RollcallController::class, 'index'])->name('rollcall.index');
    Route::post('/rollcall', [RollcallController::class, 'store'])->name('rollcall.store');
    Route::put('/rollcall/{student}', [RollcallController::class, 'update'])->name('rollcall.update');
    Route::delete('/rollcall/{student}', [RollcallController::class, 'destroy'])->name('rollcall.destroy');
    Route::post('/rollcall/grades', [RollcallController::class, 'storeGrade'])->name('rollcall.grades.store');
    Route::post('/rollcall/buses', [RollcallController::class, 'storeBus'])->name('rollcall.buses.store');
    Route::get('/rollcall/print', [RollcallController::class, 'print'])->name('rollcall.print');

    Route::resource('grades', GradeController::class);
    Route::resource('buses', BusController::class);
});

require __DIR__.'/settings.php';
