<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Categoria;
use App\Policies\CategoriaPolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Políticas que asocian modelos con Policies
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Categoria::class => CategoriaPolicy::class,
    ];

    /**
     * Registrar cualquier política de autenticación.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Opcional: podés definir Gates adicionales aquí si los necesitás
        // Gate::define('ver-otra-cosa', fn($user) => $user->rol === 'admin');
    }
}
