<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Admin\ClasseController;
use App\Http\Controllers\Admin\EnseignantController;
use App\Http\Controllers\Admin\TuteurController;
use App\Http\Controllers\Admin\EleveController;
use App\Http\Controllers\Admin\MatiereController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Teacher\NoteController;
use App\Http\Controllers\Admin\MatiereClasseEnseignantController;
use App\Http\Controllers\Admin\DashboardController;

// Enregistrement des middlewares personnalisés
app('router')->aliasMiddleware('can:is-admin', \App\Http\Middleware\IsAdmin::class);
app('router')->aliasMiddleware('can:is-eleve', \App\Http\Middleware\IsEleve::class); // pour plus tard

/*
|--------------------------------------------------------------------------
| Auth Routes (public + protégées)
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);

    Route::middleware('auth:api')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('user-profile', [AuthController::class, 'userProfile']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });
});

/*
|--------------------------------------------------------------------------
| Routes pour l'ADMIN (protégées par auth:api et is-admin)
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:api', 'can:is-admin'])->prefix('admin')->group(function () {

    // Classes
    Route::apiResource('classes', ClasseController::class);

    // Élèves
    Route::prefix('eleves')->group(function () {
        Route::get('/', [EleveController::class, 'index']);
        Route::get('/niveau/{niveau}', [EleveController::class, 'parNiveau']);
        Route::get('/classe/{id}', [EleveController::class, 'parClasse']);
        Route::post('/', [EleveController::class, 'store']);
        Route::get('/{id}', [EleveController::class, 'show']);
        Route::put('/{id}', [EleveController::class, 'update']);
        Route::delete('/{id}', [EleveController::class, 'destroy']);
    });

    // Enseignants
    Route::prefix('enseignants')->group(function () {
        Route::get('/', [EnseignantController::class, 'index']);
        Route::post('/', [EnseignantController::class, 'store']);
        Route::get('/{id}', [EnseignantController::class, 'show']);
        Route::put('/{id}', [EnseignantController::class, 'update']);
        Route::delete('/{id}', [EnseignantController::class, 'destroy']);
    });
   

    // Matières
    Route::prefix('matieres')->group(function () {
        Route::get('/', [MatiereController::class, 'index']);
        Route::post('/', [MatiereController::class, 'store']);
        Route::get('/{id}', [MatiereController::class, 'show']);
        Route::put('/{id}', [MatiereController::class, 'update']);
        Route::delete('/{id}', [MatiereController::class, 'destroy']);
    });

    // Affectation Matières/Classes/Enseignants
    Route::apiResource('affectations', MatiereClasseEnseignantController::class);


    // Tuteurs

    Route::prefix('tuteurs')->group(function () {
        Route::get('/', [TuteurController::class, 'index']);
        Route::post('/', [TuteurController::class, 'store']);
        Route::get('/{id}', [TuteurController::class, 'show']);
        Route::put('/{id}', [TuteurController::class, 'update']);
        Route::delete('/{id}', [TuteurController::class, 'destroy']);
    });
    // Notes + Moyenne par période
    Route::apiResource('notes', NoteController::class);
    Route::get('/notes/moyenne/{eleveId}/{periode}', [NoteController::class, 'moyenneParPeriode']);

    //users
    Route::get('/users', [UserController::class, 'index']);

    //document éléve
    Route::get('/admin/eleves/{id}/documents', [EleveController::class, 'showWithDocuments']);

    // Dashboard stats
    Route::get('/dashboard', [DashboardController::class, 'stats']);
});

/*
|--------------------------------------------------------------------------
| Routes pour l'ÉLÈVE connecté 
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:api', 'can:is-eleve'])->prefix('eleve')->group(function () {
    Route::get('bulletins', [EleveController::class, 'mesBulletins']);
});
