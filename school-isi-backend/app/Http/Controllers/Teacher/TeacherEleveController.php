<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Eleve;

class TeacherEleveController extends Controller
{
    public function elevesParClasse($classeId)
    {
        $eleves = Eleve::where('classe_id', $classeId)->get();

        return response()->json($eleves);
    }
}
