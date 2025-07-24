<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Admin\ClasseController; 
use App\Http\Controllers\Api\Admin\EnseignantController;
use App\Http\Controllers\Api\Admin\MatiereController;
use App\Http\Controllers\Api\Admin\MatiereClasseEnseignantController;

Route::prefix('auth')->group(function () {
    
    // Routes publiques (pas de middleware ici)
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']); // Note: on la déplacera plus tard

    // Routes protégées qui nécessitent un token
    Route::middleware('auth:api')->group(function() {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('user-profile', [AuthController::class, 'userProfile']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
});

// --- GROUPE POUR LES ROUTES DE L'ADMINISTRATION ---
Route::middleware(['auth:api', 'can:is-admin'])->prefix('admin')->group(function () {
    
    // Route pour la gestion complète des classes
   // !Route::apiResource('classes', ClasseController::class);
    
    // Vous ajouterez les autres routes admin ici...
        Route::apiResource('enseignants', EnseignantController::class);
    Route::apiResource('matieres', MatiereController::class);
    Route::apiResource('affectations', MatiereClasseEnseignantController::class);
});