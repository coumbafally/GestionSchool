<?php

namespace App\Http\Controllers\Admin;

use App\Models\Eleve;
use App\Models\Classe;
use App\Models\User;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;
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
    $request->validate([
        'user_id' => 'required|exists:users,id',
        'classe_id' => 'required|exists:classes,id',
        'date_naissance' => 'required|date',
        'lieu_naissance' => 'required|string',
        'adresse' => 'required|string',
        'justificatif' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048'
    ]);

    // Génération d’identifiant automatique
    $identifiant = 'ISI-' . now()->year . '-' . rand(100, 999);


    $eleve = Eleve::create([
        'user_id' => $request->user_id,
        'classe_id' => $request->classe_id,
        'date_naissance' => $request->date_naissance,
        'lieu_naissance' => $request->lieu_naissance,
        'adresse' => $request->adresse,
        'identifiant_eleve' => $identifiant,
    ]);

    // Gestion du fichier justificatif
    if ($request->hasFile('justificatif')) {
        $file = $request->file('justificatif');
        $path = $file->store('justificatifs', 'public');

        $eleve->documents()->create([
            'type_document' => 'Justificatif',
            'chemin_fichier' => $path,
        ]);
    }

    return response()->json(['message' => 'Élève créé avec succès'], 201);
}



    // Afficher un élève avec ses documents
    public function showWithDocuments($id)
    {
        $eleve = Eleve::with(['user', 'classe', 'documents'])->findOrFail($id);
        return response()->json($eleve);
    }

    // Afficher un élève
    public function show($id)
    {
        return Eleve::with(['user', 'classe', 'documents'])->findOrFail($id);
    }

    // Modifier un élève
public function update(Request $request, $id)
{
    $eleve = Eleve::findOrFail($id);

    // 🔁 Mise à jour des champs élève
    $eleve->update([
        'classe_id' => $request->classe_id,
        'date_naissance' => $request->date_naissance,
        'lieu_naissance' => $request->lieu_naissance,
        'adresse' => $request->adresse
    ]);

    // 🔁 Mise à jour des champs utilisateur liés
    if ($request->filled('nom') || $request->filled('prenom') || $request->filled('email')) {
        $user = $eleve->user;
        if ($request->filled('nom')) $user->nom = $request->nom;
        if ($request->filled('prenom')) $user->prenom = $request->prenom;
        if ($request->filled('email')) $user->email = $request->email;
        $user->save();
    }

    // 🔁 Justificatif (si changé)
    if ($request->hasFile('justificatif')) {
        $ancienDoc = Document::where('eleve_id', $eleve->id)->first();
        if ($ancienDoc && Storage::disk('public')->exists($ancienDoc->chemin_fichier)) {
            Storage::disk('public')->delete($ancienDoc->chemin_fichier);
            $ancienDoc->delete();
        }

        $path = $request->file('justificatif')->store('justificatifs', 'public');

        Document::create([
            'eleve_id' => $eleve->id,
            'type_document' => 'Justificatif',
            'chemin_fichier' => $path,
        ]);
    }

    return response()->json(['message' => 'Élève mis à jour', 'data' => $eleve]);
}


    // Supprimer
    public function destroy($id)
    {
        Eleve::destroy($id);

        return response()->json(['message' => 'Élève supprimé']);
    }

    
}
