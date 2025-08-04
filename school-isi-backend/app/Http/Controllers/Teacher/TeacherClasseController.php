<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\MatiereClasseEnseignant;

class TeacherClasseController extends Controller
{
    public function mesAffectations()
    {
        $enseignantId = Auth::user()->enseignant->id;

        $affectations = MatiereClasseEnseignant::with(['classe', 'matiere'])
            ->where('enseignant_id', $enseignantId)
            ->get();

        return response()->json($affectations);
    }
}
