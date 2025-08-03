<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enseignant;
use App\Models\Eleve;
use App\Models\Classe;
use App\Models\Matiere;
use App\Models\MatiereClasseEnseignant;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'enseignants' => Enseignant::whereHas('user', function ($query) {
                $query->where('role', 'enseignant');
            })->count(),
            'eleves' => Eleve::count(),
            'classes' => Classe::count(),
            'matieres' => Matiere::count(),
            'affectations' => MatiereClasseEnseignant::count(),
        ]);
    }
}
