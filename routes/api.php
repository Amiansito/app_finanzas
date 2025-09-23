<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoriaController;
use App\Http\Controllers\Api\GastoController;
use App\Http\Controllers\Api\IngresoController;
use App\Http\Controllers\Api\PerfilController;

// 🔐 Rutas públicas
Route::post('/register', [AuthController::class, 'register']); 
Route::post('/login', [AuthController::class, 'login']); 

// 🔒 Rutas protegidas con Sanctum
Route::middleware('auth:sanctum')->group(function () {

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // Perfil del usuario
    Route::get('/perfil', [PerfilController::class, 'show']);
    Route::put('/perfil', [PerfilController::class, 'update']);
    Route::delete('/perfil', [PerfilController::class, 'destroy']);

    // Recursos principales
    Route::apiResource('users', UserController::class);
    Route::apiResource('transactions', TransactionController::class);
    Route::apiResource('categorias', CategoriaController::class);
    Route::apiResource('gastos', GastoController::class);
    Route::apiResource('ingresos', IngresoController::class);
});
