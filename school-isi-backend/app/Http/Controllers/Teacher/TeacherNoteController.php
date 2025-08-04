<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Note;
use App\Models\MatiereClasseEnseignant;
use App\Models\Eleve;
use Illuminate\Support\Facades\Auth;

class TeacherNoteController extends Controller
{
    public function index()
    {
        try {
            $enseignantId = Auth::user()->enseignant->id;

            $notes = Note::whereHas('matiereClasseEnseignant', function ($q) use ($enseignantId) {
                $q->where('enseignant_id', $enseignantId);
            })
            ->with([
                'eleve.user',
                'matiereClasseEnseignant.matiere',
                'matiereClasseEnseignant.classe'
            ])
            ->orderBy('created_at', 'desc')
            ->get();

            return response()->json([
                'success' => true,
                'data' => $notes
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des notes',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $enseignantId = Auth::user()->enseignant->id;

            $validated = $request->validate([
                'eleve_id' => 'required|exists:eleves,id',
                'mce_id' => 'required|exists:matiere_classe_enseignant,id',
                'type' => 'required|in:Devoir,Examen',
                'periode' => 'required|string',
                'note' => 'required|numeric|min:0|max:20',
                'coefficient' => 'nullable|numeric|min:0.1',
            ]);

            // Vérifier que l'enseignant peut noter cette matière
            $mce = MatiereClasseEnseignant::where('id', $validated['mce_id'])
                ->where('enseignant_id', $enseignantId)
                ->first();

            if (!$mce) {
                return response()->json([
                    'success' => false,
                    'message' => 'Vous n\'êtes pas autorisé à noter cette matière'
                ], 403);
            }

            $validated['coefficient'] = $validated['coefficient'] ?? 1;
            $validated['appreciation'] = $this->genererAppreciation($validated['note']);

            $note = Note::create($validated);
            $note->load([
                'eleve.user',
                'matiereClasseEnseignant.matiere',
                'matiereClasseEnseignant.classe'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Note enregistrée avec succès',
                'data' => $note
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Données invalides',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de l\'enregistrement',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $enseignantId = Auth::user()->enseignant->id;
            
            $note = Note::whereHas('matiereClasseEnseignant', function ($q) use ($enseignantId) {
                $q->where('enseignant_id', $enseignantId);
            })->findOrFail($id);

            $validated = $request->validate([
                'note' => 'required|numeric|min:0|max:20',
                'coefficient' => 'nullable|numeric|min:0.1',
                'type' => 'required|in:Devoir,Examen',
                'periode' => 'required|string',
            ]);

            $validated['appreciation'] = $this->genererAppreciation($validated['note']);

            $note->update($validated);
            $note->load([
                'eleve.user',
                'matiereClasseEnseignant.matiere',
                'matiereClasseEnseignant.classe'
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Note mise à jour avec succès',
                'data' => $note
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la mise à jour',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $enseignantId = Auth::user()->enseignant->id;
            
            $note = Note::whereHas('matiereClasseEnseignant', function ($q) use ($enseignantId) {
                $q->where('enseignant_id', $enseignantId);
            })->findOrFail($id);

            $note->delete();

            return response()->json([
                'success' => true,
                'message' => 'Note supprimée avec succès'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la suppression',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Récupérer les affectations de l'enseignant pour le formulaire
    public function getMesAffectations()
    {
        try {
            $enseignantId = Auth::user()->enseignant->id;

            $affectations = MatiereClasseEnseignant::where('enseignant_id', $enseignantId)
                ->with(['matiere', 'classe'])
                ->get();

            return response()->json([
                'success' => true,
                'data' => $affectations
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des affectations',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    // Récupérer les élèves d'une classe
    public function getElevesParClasse($classeId)
    {
        try {
            $eleves = Eleve::where('classe_id', $classeId)
                ->with('user')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $eleves
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur lors de la récupération des élèves',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    private function genererAppreciation($note)
    {
        return match(true) {
            $note < 5    => 'Très insuffisant',
            $note < 10   => 'Insuffisant',
            $note < 12   => 'Passable',
            $note < 14   => 'Assez bien',
            $note < 16   => 'Bien',
            $note < 18   => 'Très bien',
            default      => 'Excellent',
        };
    }
}