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
use App\Http\Controllers\Admin\NoteController;
use App\Http\Controllers\Admin\MatiereClasseEnseignantController;
use App\Http\Controllers\Admin\DashboardController;

// Enregistrement des middlewares personnalisés
app('router')->aliasMiddleware('can:is-admin', \App\Http\Middleware\IsAdmin::class);
app('router')->aliasMiddleware('can:is-eleve', \App\Http\Middleware\IsEleve::class);

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

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);


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
        Route::get('/classe-id/{id}', [EleveController::class, 'getByClasseId']);

        
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
    Route::get('admin/affectations/classe/{classeId}', [MatiereClasseEnseignantController::class, 'getByClasse']);
    

    // Tuteurs

    Route::prefix('tuteurs')->group(function () {
        Route::get('/', [TuteurController::class, 'index']);
        Route::post('/', [TuteurController::class, 'store']);
        Route::get('/{id}', [TuteurController::class, 'show']);
        Route::put('/{id}', [TuteurController::class, 'update']);
        Route::delete('/{id}', [TuteurController::class, 'destroy']);
    });

   // notes
    Route::prefix('notes')->group(function () {
        Route::get('/', [NoteController::class, 'index']);
        Route::post('/', [NoteController::class, 'store']);
        Route::get('/{id}', [NoteController::class, 'show']);
        Route::put('/{id}', [NoteController::class, 'update']);
        Route::delete('/{id}', [NoteController::class, 'destroy']);

        Route::get('/moyenne/{eleveId}/{periode}', [NoteController::class, 'moyenneParPeriode']);
        Route::get('/classe/{classeId}/periode/{periode}', [NoteController::class, 'notesParClasseEtPeriode']);
        Route::get('/admin/eleves/{eleveId}/bulletin/{periode}', [NoteController::class, 'bulletinParEleveEtPeriode']);

        
    });


    //users
    Route::get('/users', [UserController::class, 'index']);

    //document éléve
    Route::get('/admin/eleves/{id}/documents', [EleveController::class, 'showWithDocuments']);

    //bulletins
    Route::get('bulletins/{eleveId}/{periode}/pdf', [NoteController::class, 'genererBulletinPdf']);

});

/*
|--------------------------------------------------------------------------
| Routes pour l'ÉLÈVE connecté 
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:api', 'can:is-eleve'])->prefix('eleve')->group(function () {
    Route::get('bulletins', [EleveController::class, 'mesBulletins']);
});
