<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\RollcallController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/rollcall', [RollcallController::class, 'index'])->middleware(['auth'])->name('rollcall.index');
Route::post('/rollcall', [RollcallController::class, 'store'])->middleware(['auth'])->name('rollcall.store');
Route::get('/rollcall/print', [RollcallController::class, 'print'])->middleware(['auth'])->name('rollcall.print');

require __DIR__.'/settings.php';
