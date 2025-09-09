<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\AuthController;

// 🔐 Rutas de autenticación
Route::post('/register', [AuthController::class, 'register']); 
// Registro de usuario nuevo (público)

Route::post('/login', [AuthController::class, 'login']); 
// Login de usuario, devuelve un token (público)

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth:sanctum'); 
// Logout de usuario (requiere token válido → protegido con Sanctum)

// 👤 CRUD de usuarios
Route::apiResource('users', UserController::class)
    ->middleware('auth:sanctum'); 
// Rutas de usuarios (todas protegidas, necesitan login)

// 💰 CRUD de transacciones
Route::apiResource('transactions', TransactionController::class)
    ->middleware('auth:sanctum'); 
// Rutas de transacciones (todas protegidas, necesitan login)
