<?php

use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => ['ok' => true]);
Route::apiResource('tasks', TaskController::class)->only(['index', 'store']);
