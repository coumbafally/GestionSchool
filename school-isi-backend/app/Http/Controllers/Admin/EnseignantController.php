<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enseignant;
use Illuminate\Http\Request;

class EnseignantController extends Controller
{
    public function index()
{
    $enseignants = Enseignant::whereHas('user', function ($query) {
        $query->where('role', 'enseignant');
    })
    ->with('user')
    ->get();

    return response()->json($enseignants);
}

   public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'matricule' => 'required|string|max:255|unique:enseignants'
        ]);

        $enseignant = Enseignant::create($validated);
        return response()->json($enseignant, 201);

    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}


    public function show($id)
    {
        $enseignant = Enseignant::with('user')->findOrFail($id);
        return response()->json($enseignant);
    }

   public function update(Request $request, $id)
{
    $enseignant = Enseignant::findOrFail($id);

   
    if ($request->filled('matricule')) {
        $enseignant->matricule = $request->matricule;
        $enseignant->save();
    }

   
    if ($enseignant->user && ($request->filled('nom') || $request->filled('prenom') || $request->filled('email'))) {
        $user = $enseignant->user;
        if ($request->filled('nom')) $user->nom = $request->nom;
        if ($request->filled('prenom')) $user->prenom = $request->prenom;
        if ($request->filled('email')) $user->email = $request->email;
        $user->save();
    }

    return response()->json(['message' => 'Enseignant mis à jour avec succès', 'enseignant' => $enseignant]);
}


    public function destroy($id)
    {
        $enseignant = Enseignant::findOrFail($id);
        $enseignant->delete();
        return response()->json(['message' => 'Enseignant supprimé']);
    }
}
