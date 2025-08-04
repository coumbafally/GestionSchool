<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsTuteur
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role === 'tuteur') {
            return $next($request);
        }

        return response()->json(['error' => 'Accès refusé.'], 403);
    }
}