<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use Illuminate\Http\Request;

class ClasseController extends Controller
{
    /**
     * Récupère toutes les classes.
     */
    public function index()
    {
        return response()->json(Classe::all());
    }
}
