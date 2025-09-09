<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    // Campos que se pueden asignar de manera masiva
    protected $fillable = [
        'user_id',
        'type',
        'amount',
        'description',
    ];

    // Relación con el modelo User (muchas transacciones pertenecen a un usuario)
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}