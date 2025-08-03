<?php

namespace App\Http\Controllers\Admin;

use App\Models\Eleve;
use App\Models\Classe;
use App\Models\User;
use App\Models\Bulletin;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class BulletinController extends Controller
{

    public function monBulletin()
    {
        $user = Auth::user();
        $eleve = Eleve::where('user_id', $user->id)->first();

        if (!$eleve) {
            return response()->json(['message' => 'Élève non trouvé.'], 404);
        }

        $bulletins = Bulletin::where('eleve_id', $eleve->id)->get();

        return response()->json($bulletins);
    }


}
