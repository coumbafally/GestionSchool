<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
<<<<<<< HEAD
use Illuminate\Http\Request;

class TuteurController extends Controller
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
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
=======
use App\Models\Tuteur;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TuteurController extends Controller
{
    public function index()
    {
        return Tuteur::with(['user', 'eleve'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'numero_tel' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'eleve_id' => 'required|exists:eleves,id',
        ]);

        $validated['identifiant_tuteur'] = Str::uuid();

        $tuteur = Tuteur::create($validated);

        return response()->json($tuteur, 201);
    }

    public function show($id)
    {
        $tuteur = Tuteur::with(['user', 'eleve'])->findOrFail($id);
        return response()->json($tuteur);
    }

    public function update(Request $request, $id)
    {
        $tuteur = Tuteur::findOrFail($id);

        $validated = $request->validate([
            'numero_tel' => 'sometimes|string',
            'user_id' => 'sometimes|exists:users,id',
            'eleve_id' => 'sometimes|exists:eleves,id',
        ]);

        $tuteur->update($validated);

        return response()->json($tuteur);
    }

    public function destroy($id)
    {
        $tuteur = Tuteur::findOrFail($id);
        $tuteur->delete();

        return response()->json(['message' => 'Tuteur supprimé']);
    }
}

>>>>>>> origin/magou
