<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    protected function redirectTo($request)
    {
        // Para solicitudes API no redirigir, Laravel devolverá 401 automáticamente
        if ($request->expectsJson() || $request->is('api/*')) {
            return null;
        }

        // Para web, puedes redirigir a login
        return route('login');
    }
}
