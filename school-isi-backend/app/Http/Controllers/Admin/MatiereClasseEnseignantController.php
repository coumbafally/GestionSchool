<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MatiereClasseEnseignant;
use Illuminate\Http\Request;

class MatiereClasseEnseignantController extends Controller
{
    public function index()
    {
        return response()->json(
            MatiereClasseEnseignant::with(['classe', 'matiere', 'enseignant'])->get()
        );
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'classe_id' => 'required|exists:classes,id',
            'matiere_id' => 'required|exists:matieres,id',
            'enseignant_id' => 'required|exists:enseignants,id',
        ]);

        // Unicité classe + matiere
        $exists = MatiereClasseEnseignant::where([
            'classe_id' => $validated['classe_id'],
            'matiere_id' => $validated['matiere_id'],
        ])->exists();

        if ($exists) {
            return response()->json(['error' => 'Cette matière est déjà affectée à cette classe.'], 422);
        }

        $affectation = MatiereClasseEnseignant::create($validated);
        return response()->json($affectation, 201);
    }

    public function update(Request $request, $id)
{
    $affectation = MatiereClasseEnseignant::findOrFail($id);

    $validated = $request->validate([
        'classe_id' => 'required|exists:classes,id',
        'matiere_id' => 'required|exists:matieres,id',
        'enseignant_id' => 'required|exists:enseignants,id',
    ]);

    // Vérifie s’il existe déjà une affectation identique (hors celle en cours)
    $exists = MatiereClasseEnseignant::where('classe_id', $validated['classe_id'])
        ->where('matiere_id', $validated['matiere_id'])
        ->where('id', '!=', $id)
        ->exists();

    if ($exists) {
        return response()->json(['error' => 'Cette combinaison classe/matière existe déjà.'], 422);
    }

    $affectation->update($validated);

    return response()->json(['message' => 'Affectation mise à jour', 'data' => $affectation]);
}


    public function destroy($id)
    {
        $affectation = MatiereClasseEnseignant::findOrFail($id);
        $affectation->delete();
        return response()->json(['message' => 'Affectation supprimée']);
    }
}
