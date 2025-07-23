<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;


Route::controller(AuthController::class)->prefix('auth')->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
});


Route::controller(AuthController::class)->prefix('auth')->middleware('auth:api')->group(function () {
    Route::post('logout', 'logout');
    Route::get('user-profile', 'userProfile');
    Route::post('refresh', 'refresh');

<<<<<<< HEAD
});

Route::middleware(['auth:api', 'can:is-admin'])->prefix('admin')->group(function () {

    // Route pour la gestion complète des classes
    Route::apiResource('classes', App\Http\Controllers\Admin\ClasseController::class);
=======
>>>>>>> aab07b7c73a6935cd0b72e505066d2c8364362ec
});