<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Matiere;
use Illuminate\Http\Request;

class MatiereController extends Controller
{
    public function index()
    {
        return response()->json(Matiere::all());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string',
            'coefficient' => 'required|integer|min:1'
        ]);

        $matiere = Matiere::create($validated);
        return response()->json($matiere, 201);
    }

    public function show($id)
    {
        return response()->json(Matiere::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        $matiere = Matiere::findOrFail($id);
        $matiere->update($request->only(['nom', 'coefficient']));
        return response()->json($matiere);
    }

    public function destroy($id)
    {
        $matiere = Matiere::findOrFail($id);
        $matiere->delete();
        return response()->json(['message' => 'Matière supprimée']);
    }
}
