<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Classe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; 

class ClasseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

         // Récupère toutes les classes, triées par date de création la plus récente
         $classes = Classe::latest()->get();
        return response()->json($classes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255|unique:classes',
            'niveau' => 'required|string|max:255',
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

            'nom' => 'required|string|max:255|unique:classes,nom,' . $classe->id,
            'niveau' => 'required|string|max:255',
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
        
        //  ne pas supprimer si la classe a des élèves.
        // if ($classe->eleves()->count() > 0) {
        //     return response()->json(['error' => 'Impossible de supprimer une classe qui contient des élèves.'], 409); // 409 = Conflict
        // }

        $classe->delete();

        return response()->json(null, 204); // 204 = No Content (succès sans rien à retourner)
    }
}
