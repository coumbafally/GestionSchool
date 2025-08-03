<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use App\Models\Eleve;

class NoteController extends Controller
{
    public function index()
    {
        return Note::with(['eleve.user', 'mce.matiere', 'mce.classe', 'mce.enseignant'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'eleve_id' => 'required|exists:eleves,id',
            'mce_id' => 'required|exists:matiere_classe_enseignant,id',
            'type' => 'required|in:Devoir,Examen',
            'periode' => 'required|string',
            'note' => 'required|numeric|min:0|max:20',
            'coefficient' => 'nullable|numeric|min:0.1',
            'appreciation' => 'nullable|string',
        ]);

        $validated['coefficient'] = $validated['coefficient'] ?? 1;

        $note = Note::create($validated);

        return response()->json([
            'message' => 'Note enregistrée avec succès',
            'data' => $note
        ]);
    }

    public function show($id)
    {
        return Note::with([
            'eleve.user', 
            'eleve.classe', 
            'mce.matiere', 
            'mce.classe', 
            'mce.enseignant'
        ])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $note = Note::findOrFail($id);

        $validated = $request->validate([
            'note' => 'nullable|numeric|min:0|max:20',
            'coefficient' => 'nullable|numeric|min:0.1',
            'appreciation' => 'nullable|string',
            'type' => 'in:Devoir,Examen',
            'periode' => 'nullable|string',
        ]);

        $note->update($validated);

        return response()->json([
            'message' => 'Note mise à jour',
            'data' => $note
        ]);
    }

    public function destroy($id)
    {
        $note = Note::findOrFail($id);
        $note->delete();

        return response()->json(['message' => 'Note supprimée avec succès']);
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
        $coeffTotal = 0;

        foreach ($notes as $note) {
            $coeff = $note->coefficient ?? 1;
            $total += $note->note * $coeff;
            $coeffTotal += $coeff;
        }

        $moyenne = $coeffTotal > 0 ? round($total / $coeffTotal, 2) : 0;

        return response()->json([
            'eleve_id' => $eleveId,
            'periode' => $periode,
            'moyenne' => $moyenne,
        ]);
    }

    public function notesParClasseEtPeriode($classeId, $periode)
{
    $notes = Note::with([
        'eleve.user',
        'matiereClasseEnseignant.matiere',
        'matiereClasseEnseignant.enseignant.user'
    ])
    ->whereHas('eleve', function ($query) use ($classeId) {
        $query->where('classe_id', $classeId);
    })
    ->where('periode', $periode)
    ->get();

    return response()->json($notes);
    }

    public function getByClasseAndPeriode($classeId, $periode)
{
    return Note::with(['eleve.user', 'matiereClasseEnseignant.matiere'])
        ->whereHas('matiereClasseEnseignant', function ($q) use ($classeId) {
            $q->where('classe_id', $classeId);
        })
        ->where('periode', $periode)
        ->get();
    }

    public function bulletinParEleveEtPeriode($eleveId, $periode)
    {
        $notes = Note::with([
            'matiereClasseEnseignant.matiere',
            'matiereClasseEnseignant.enseignant.user'
        ])
        ->where('eleve_id', $eleveId)
        ->where('periode', $periode)
        ->get();

        if ($notes->isEmpty()) {
            return response()->json(['message' => 'Aucune note trouvée pour cet élève et cette période.'], 404);
        }

        $bulletin = [];
        $totalNote = 0;
        $totalCoef = 0;

        foreach ($notes as $note) {
            $coef = $note->coefficient ?? 1;
            $matiere = $note->matiereClasseEnseignant->matiere->nom ?? 'Inconnue';

            if (!isset($bulletin[$matiere])) {
                $bulletin[$matiere] = [
                    'matiere' => $matiere,
                    'notes' => [],
                    'total' => 0,
                    'coefficient' => 0
                ];
            }

            $bulletin[$matiere]['notes'][] = [
                'type' => $note->type,
                'note' => $note->note,
                'coef' => $coef,
                'appréciation' => $note->appreciation
            ];

            $bulletin[$matiere]['total'] += $note->note * $coef;
            $bulletin[$matiere]['coefficient'] += $coef;

            $totalNote += $note->note * $coef;
            $totalCoef += $coef;
        }

        foreach ($bulletin as $key => $data) {
            $bulletin[$key]['moyenne'] = round($data['total'] / $data['coefficient'], 2);
        }

        $moyenneGénérale = $totalCoef > 0 ? round($totalNote / $totalCoef, 2) : 0;

        return response()->json([
            'bulletin' => array_values($bulletin),
            'moyenne_generale' => $moyenneGénérale,
            'mention' => $this->mention($moyenneGénérale)
        ]);
    }

    private function mention($moyenne)
    {
        return match(true) {
            $moyenne >= 16 => 'Très Bien',
            $moyenne >= 14 => 'Bien',
            $moyenne >= 12 => 'Assez Bien',
            $moyenne >= 10 => 'Passable',
            default => 'Insuffisant',
        };
    }


}
