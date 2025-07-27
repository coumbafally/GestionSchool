<?php


namespace App\Providers;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\User; 

class AuthServiceProvider extends ServiceProvider
{

     protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
         $this->registerPolicies();

         
        /**
         * Définition des Gates pour les rôles des utilisateurs.
         * Ces fonctions reçoivent l'utilisateur authentifié et doivent retourner
         * true si l'utilisateur est autorisé, false sinon.
         */

        // Gate pour l'administrateur
        Gate::define('is-admin', function (User $user) {
            return $user->role === 'admin';
        });

        // Gate pour l'enseignant
        Gate::define('is-enseignant', function (User $user) {
            return $user->role === 'enseignant';
        });

        // Gate pour l'élève/parent
        Gate::define('is-eleve', function (User $user) {
            return $user->role === 'eleve';
        });

        // On peut aussi combiner les rôles si besoin
        Gate::define('is-admin-or-enseignant', function (User $user) {
            return in_array($user->role, ['admin', 'enseignant']);
        });

         Gate::define('is-tuteur', function (User $user) {
            return $user->role->nom === 'tuteur';
        });
    }
    }

