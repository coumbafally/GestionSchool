<?php

namespace App\Http\Controllers\Admin;

<<<<<<< HEAD
use App\Http\Controllers\Controller;
use App\Models\Eleve;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EleveController extends Controller
{
    /**
     * Affiche la liste de tous les élèves, avec leurs informations utilisateur et leur classe.
     * 
     */
    public function index()
    {
 $eleves = Eleve::whereHas('user')->whereHas('classe')->with(['user', 'classe'])->latest()->get();
    
    return $eleves;
    }

    /**
     * Crée un nouvel élève et son compte utilisateur associé en une seule opération.
     * C'est la méthode d'inscription principale.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'classe_id' => 'required|exists:classes,id',
            'date_naissance' => 'required|date',
            'lieu_naissance' => 'required|string|max:255',
            'adresse' => 'required|string',
            'justificatif' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120'
        ]);

        DB::beginTransaction();
        try {
            $user = User::create([
                'nom' => $validatedData['nom'],
                'prenom' => $validatedData['prenom'],
                'email' => $validatedData['email'],
                'password' => Hash::make('password'), 
                'role' => 'eleve' 
            ]);

            $eleve = Eleve::create([
                'user_id' => $user->id,
                'classe_id' => $validatedData['classe_id'],
                'date_naissance' => $validatedData['date_naissance'],
                'lieu_naissance' => $validatedData['lieu_naissance'],
                'adresse' => $validatedData['adresse'],
                'identifiant_eleve' => 'ISI-' . now()->year . '-' . Str::upper(Str::random(4)),
            ]);

            if ($request->hasFile('justificatif')) {
                $path = $request->file('justificatif')->store('justificatifs', 'public');
                $eleve->documents()->create([
                    'type_document' => 'Justificatif',
                    'chemin_fichier' => $path,
                ]);
            }

            DB::commit(); 

            return response()->json($eleve->load(['user', 'documents']), 201);

        } catch (\Exception $e) {
            DB::rollBack(); 
            return response()->json([
                'message' => 'Erreur lors de la création de l\'élève.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Affiche les détails d'un élève spécifique, avec ses informations et ses documents.
     */
    public function show(Eleve $eleve)
    {
        return $eleve->load(['user', 'classe', 'documents']);
    }

    /**
     * Met à jour les informations d'un élève et/ou de son compte utilisateur.Note: La méthode update de Laravel ne fonctionne pas bien avec les fichiers,
     * 
     * 
     */
    public function update(Request $request, Eleve $eleve)
{
    $validatedData = $request->validate([
        'nom' => 'sometimes|required|string|max:255',
        'prenom' => 'sometimes|required|string|max:255',
        'email' => 'sometimes|required|string|email|max:255|unique:users,email,' . $eleve->user_id,

        'classe_id' => 'sometimes|required|exists:classes,id',
        'date_naissance' => 'sometimes|required|date',
        'lieu_naissance' => 'sometimes|required|string|max:255',
        'adresse' => 'sometimes|required|string',
        
        'justificatif' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120'
    ]);

    // On met à jour le profil de l'élève avec les champs qui le concernent
    $eleve->update($validatedData);

    // On met à jour le compte utilisateur avec les champs qui le concernent
    // Le `if` est une sécurité si les champs ne sont pas envoyés
    if (isset($validatedData['nom']) || isset($validatedData['prenom']) || isset($validatedData['email'])) {
        $eleve->user->update($validatedData);
    }
    
    // --- Votre excellente logique pour l'upload de fichier reste la même ---
    if ($request->hasFile('justificatif')) {
        // ... (logique de suppression de l'ancien et ajout du nouveau) ...
    }

    return response()->json($eleve->load(['user', 'classe', 'documents']));
}

    /**
     * Supprime un élève. Le compte utilisateur et les documents associés
     * seront supprimés automatiquement grâce à `onDelete('cascade')`.
     */
    public function destroy(Eleve $eleve)
    {
        // On pourrait ajouter une vérification pour ne pas supprimer un élève avec des notes.
        // if ($eleve->notes()->count() > 0) { ... }

        $eleve->delete();
        return response()->json(['message' => 'Élève supprimé avec succès']);
    }

    // --- Vos méthodes de tri utiles ---

    /**
     * Affiche les élèves groupés par niveau.
     */
=======
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
>>>>>>> origin/magou
    public function parNiveau($niveau)
    {
        return Eleve::whereHas('classe', function ($query) use ($niveau) {
            $query->where('niveau', $niveau);
        })->with(['user', 'classe'])->get();
    }

<<<<<<< HEAD
    /**
     * Affiche les élèves d'une classe spécifique.
     */
=======
    // Afficher élèves par classe (ex : L1 Génie Logiciel)
>>>>>>> origin/magou
    public function parClasse($classeId)
    {
        return Eleve::where('classe_id', $classeId)
            ->with(['user', 'classe'])
            ->get();
    }
<<<<<<< HEAD
}
=======

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
>>>>>>> origin/magou
