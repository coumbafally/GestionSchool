<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tuteur;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TuteurController extends Controller
{
    public function index()
    {
        return Tuteur::with(['user', 'eleve.user'])->get();

    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'eleve_id' => 'required|exists:eleves,id',
            'numero_tel' => 'required|string',
        ]);

        $identifiant = 'TUT-' . now()->year . '-' . rand(100, 9999);

        $tuteur = Tuteur::create([
            'user_id' => $request->user_id,
            'eleve_id' => $request->eleve_id,
            'numero_tel' => $request->numero_tel,
            'identifiant_tuteur' => $identifiant,
        ]);

        return response()->json(['message' => 'Tuteur créé avec succès', 'data' => $tuteur]);
    }

    public function show($id)
    {
        return Tuteur::with(['user', 'eleve.user'])->findOrFail($id);
    }


    public function update(Request $request, $id)
    {
        $tuteur = Tuteur::findOrFail($id);

        $request->validate([
            'numero_tel' => 'required|string',
            'eleve_id' => 'required|exists:eleves,id',
        ]);

        // Mise à jour du tuteur
        $tuteur->update([
            'numero_tel' => $request->numero_tel,
            'eleve_id' => $request->eleve_id,
        ]);

        // Mise à jour des infos utilisateur
        if ($request->filled('nom') || $request->filled('prenom') || $request->filled('email')) {
            $user = $tuteur->user;
            if ($request->filled('nom')) $user->nom = $request->nom;
            if ($request->filled('prenom')) $user->prenom = $request->prenom;
            if ($request->filled('email')) $user->email = $request->email;
            $user->save();
        }

        return response()->json(['message' => 'Tuteur mis à jour', 'data' => $tuteur]);
    }


    public function destroy($id)
    {
        $tuteur = Tuteur::findOrFail($id);

        $user = $tuteur->user;

        $tuteur->delete();
        $user->delete();

        return response()->json(['message' => 'Tuteur supprimé avec succès']);
    }


}