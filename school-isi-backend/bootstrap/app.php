<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
         apiPrefix: 'api',
    )
    ->withMiddleware(function (Middleware $middleware): void {
         $middleware->alias([
            'jwt.auth' => \Tymon\JWTAuth\Http\Middleware\Authenticate::class,
            'jwt.refresh' => \Tymon\JWTAuth\Http\Middleware\RefreshToken::class,
        ]);

    })

    ->withExceptions(function (Exceptions $exceptions): void {
       /*  $exceptions->renderable(function (\Illuminate\Auth\AuthenticationException $e, $request) {
        // On vérifie si la requête s'attend à une réponse JSON
        if ($request->expectsJson()) {
            // Si oui, on retourne une réponse JSON 401
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }
    });*/
    })->create();
