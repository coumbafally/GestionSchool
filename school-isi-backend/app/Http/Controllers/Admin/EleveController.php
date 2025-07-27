<?php

namespace App\Http\Controllers\Admin;

use App\Models\Eleve;
use App\Models\Classe;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class EleveController extends Controller
{
    // Lister tous les élèves
    public function index()
    {
        return Eleve::with(['user', 'classe'])->get();
    }

    public function monProfil(Request $request)
    {
        $user = Auth::user();
        $eleve = Eleve::with('classe')->where('user_id', $user->id)->first();

        if (!$eleve) {
            return response()->json(['message' => 'Aucun élève trouvé.'], 404);
        }

        return response()->json($eleve);
    }


    // Afficher élèves par niveau (L1, L2, Master, etc.)
    public function parNiveau($niveau)
    {
        return Eleve::whereHas('classe', function ($query) use ($niveau) {
            $query->where('niveau', $niveau);
        })->with(['user', 'classe'])->get();
    }

    // Afficher élèves par classe (ex : L1 Génie Logiciel)
    public function parClasse($classeId)
    {
        return Eleve::where('classe_id', $classeId)
            ->with(['user', 'classe'])
            ->get();
    }

    // Créer un élève
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'classe_id' => 'required|exists:classes,id',
            'date_naissance' => 'required|date',
            'lieu_naissance' => 'required|string',
            'adresse' => 'required|string',
            'identifiant_eleve' => 'required|unique:eleves'
        ]);

        return Eleve::create($validated);
    }

    // Afficher un élève
    public function show($id)
    {
        return Eleve::with(['user', 'classe'])->findOrFail($id);
    }

    // Modifier un élève
    public function update(Request $request, $id)
    {
        $eleve = Eleve::findOrFail($id);

        $eleve->update($request->all());

        return response()->json(['message' => 'Élève mis à jour', 'data' => $eleve]);
    }

    // Supprimer
    public function destroy($id)
    {
        Eleve::destroy($id);

        return response()->json(['message' => 'Élève supprimé']);
    }
}
