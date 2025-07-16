<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Models\Utilisateur;
use Illuminate\Support\Facades\Auth;

class AuthentificationController extends Controller
{
    public function connexion(Request $request)
    {
        $credentials = $request->only('email', 'mot_de_passe');

        if (!$token = JWTAuth::attempt(['email' => $credentials['email'], 'password' => $credentials['mot_de_passe']])) {
            return response()->json(['message' => 'Identifiants invalides'], 401);
        }

        return response()->json([
            'token' => $token,
            'utilisateur' => auth::user()
        ]);
    }

    public function deconnexion()
    {
        auth::logout();
        return response()->json(['message' => 'Déconnexion réussie']);
    }

    public function UtilisateurActuel()
    {
        return response()->json(['utilisateur' => auth::user()]);
    }
}
