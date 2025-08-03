<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // On utilise le guard 'api' de Laravel, qui est configuré pour utiliser JWT.
        // C'est la méthode recommandée et la plus fiable.
        if (! $token = auth('api')->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Si on arrive ici, l'authentification a réussi.
        // On peut maintenant appeler la méthode d'aide.
        return $this->createNewToken($token);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|string|in:admin,enseignant,parent,eleve',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'nom' => $request->get('nom'),
            'prenom' => $request->get('prenom'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'role' => $request->get('role'),
        ]);
        

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], 201);
    }

    public function logout()
    {
        auth('api')->logout();
        return response()->json(['message' => 'Successfully logged out']);
    }

    public function userProfile()
    {
        return response()->json(auth('api')->user());
    }
    
    public function refresh()
    {
        return $this->createNewToken(auth('api')->refresh());
    }

    protected function createNewToken($token)
    {
        // Maintenant que la connexion est établie via le guard,
        // auth('api')->user() renverra l'utilisateur correct.
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => auth('api')->user()
        ]);
    }
}