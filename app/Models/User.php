<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    // Campos que se pueden asignar en masa (mass assignment)
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    // Relación: un usuario tiene muchas transacciones
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
