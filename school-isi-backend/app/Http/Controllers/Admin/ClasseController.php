<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use Illuminate\Http\Request;

<<<<<<< HEAD
use Illuminate\Support\Facades\Validator;

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $classes = Classe::orderBy('nom', 'asc')->get();
        return response()->json($classes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:100|unique:classes',
            'niveau' => 'required|string|max:50',
         ]);

          if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $classe = Classe::create($validator->validated());

        return response()->json($classe, 201);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Classe $classe)
    {
        return response()->json($classe);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Classe $classe)
    {
         $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:100|unique:classes,nom,' . $classe->id,
            'niveau' => 'required|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $classe->update($validator->validated());

        return response()->json($classe);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classe $classe)
    {
    if ($classe->eleves()->count() > 0) {
        return response()->json(['message' => 'Impossible de supprimer cette classe car elle contient des élèves.'
        ], 409);
    }
    $classe->delete();
    return response()->json(null, 204);
=======
class ClasseController extends Controller
{
    /**
     * Récupère toutes les classes.
     */
    public function index()
    {
        return response()->json(Classe::all());
>>>>>>> origin/magou
    }
}
