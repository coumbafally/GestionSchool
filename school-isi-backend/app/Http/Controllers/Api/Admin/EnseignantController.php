<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enseignant;
use Illuminate\Http\Request;

class EnseignantController extends Controller
{
    public function index()
    {
        return response()->json(Enseignant::with('user')->get());
    }

   public function store(Request $request)
{
    try {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'matricule' => 'required|string|max:255|unique:enseignants'
        ]);

        $enseignant = Enseignant::create($validated);
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
        $enseignant->update($request->only(['matricule']));
        return response()->json($enseignant);
    }

    public function destroy($id)
    {
        $enseignant = Enseignant::findOrFail($id);
        $enseignant->delete();
        return response()->json(['message' => 'Enseignant supprimé']);
    }
}
