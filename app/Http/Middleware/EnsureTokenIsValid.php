<?php

namespace App\Http\Middleware;

use Closure;

class EnsureTokenIsValid
{
    public function handle($request, Closure $next)
    {
        // Esto revisa si el usuario está logueado
        if (!auth()->check()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        return $next($request);
    }
}
