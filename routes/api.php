<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TransactionController;

Route::apiResource('users', UserController::class);
Route::apiResource('transactions', TransactionController::class);