<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class IsTeacher
{
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check() && Auth::user()->role === 'enseignant') {
            return $next($request);
        }

        return response()->json(['error' => 'Accès refusé.'], 403);
    }
}
