<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    $validated = $request->validate([
        'eleve_id' => 'required|exists:eleves,id',
        'matiere_id' => 'required|exists:matieres,id',
        'periode' => 'required|string|max:50',
        'type' => 'required|in:Devoir,Composition,Contrôle',
        'note' => 'required|numeric|min:0|max:20',
        'coefficient' => 'nullable|numeric|min:1'
    ]);

    // Calcul automatique de l’appréciation
    $note = $validated['note'];
    $validated['appreciation'] = match(true) {
        $note < 5    => 'Très insuffisant',
        $note < 10   => 'Insuffisant',
        $note < 12   => 'Passable',
        $note < 14   => 'Assez bien',
        $note < 16   => 'Bien',
        $note < 18   => 'Très bien',
        default      => 'Excellent',
    };

    $note = Note::create($validated);

    return response()->json([
        'message' => 'Note enregistrée avec succès',
        'note' => $note
    ], 201);
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $note = Note::findOrFail($id);

        $validated = $request->validate([
            'note' => 'required|numeric|min:0|max:20',
            'type' => 'required|in:Devoir,Composition,Contrôle',
            'coefficient' => 'required|numeric|min:1',
        ]);

        // Mise à jour de l'appréciation automatiquement
        $validated['appreciation'] = $this->genererAppreciation($validated['note']);

        $note->update($validated);

        return response()->json($note, 200);
    }

    private function genererAppreciation($note)
    {
        if ($note >= 16) return "Très bien";
        if ($note >= 14) return "Bien";
        if ($note >= 12) return "Assez bien";
        if ($note >= 10) return "Passable";
        if ($note >= 8)  return "Insuffisant";
        return "Très faible";
    }

    public function moyenneParPeriode($eleveId, $periode)
{
    $notes = Note::where('eleve_id', $eleveId)
                ->where('periode', $periode)
                ->get();

    if ($notes->isEmpty()) {
        return response()->json(['message' => 'Aucune note trouvée'], 404);
    }

    $total = 0;
    $totalCoef = 0;

    foreach ($notes as $note) {
        $total += $note->note * $note->coefficient;
        $totalCoef += $note->coefficient;
    }

    $moyenne = $total / ($totalCoef ?: 1);

    return response()->json([
        'eleve_id' => $eleveId,
        'periode' => $periode,
        'moyenne' => round($moyenne, 2),
        'mention' => $this->genererAppreciation($moyenne)
    ]);
}


        /**
         * Remove the specified resource from storage.
         */
        public function destroy(string $id)
        {
            //
        }
}
