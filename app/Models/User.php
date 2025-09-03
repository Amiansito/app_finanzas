<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Importar Sanctum

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; // Agregar HasApiTokens

    // Campos que se pueden asignar en masa (mass assignment)
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    // Ocultar campos sensibles al devolver JSON
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relación: un usuario tiene muchas transacciones
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
