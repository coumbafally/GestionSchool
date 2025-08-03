<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enseignant;
use App\Models\User;
use Illuminate\Http\Request;
use App\Mail\WelcomeUserMail;
use Illuminate\Support\Facades\Mail;

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
        ]);

        // Générer un matricule unique
        do {
            $matricule = 'ENS-ISI' . now()->year . '-' . rand(100, 999);
        } while (Enseignant::where('matricule', $matricule)->exists());

        $validated['matricule'] = $matricule;

        // Création enseignant
        $enseignant = Enseignant::create($validated);

        // Envoi email de bienvenue
        $user = User::findOrFail($validated['user_id']);
      //  $validated = $request->only(['user_id']);

        $user->sendWelcomeMail('Passer@1');

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


