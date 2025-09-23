<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Aquí podés registrar bindings, singletons, o servicios personalizados
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Aquí podés poner código que se ejecute al iniciar la app,
        // por ejemplo: configurar locales, formateos, observers, etc.
    }
}
