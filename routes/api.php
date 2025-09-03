<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\AuthController;

// Rutas de autenticación
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// CRUD de usuarios y transacciones
Route::apiResource('users', UserController::class)->middleware('auth:sanctum');
Route::apiResource('transactions', TransactionController::class)->middleware('auth:sanctum');
