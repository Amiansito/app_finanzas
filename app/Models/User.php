<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Categoria;
use App\Models\Gasto;
use App\Models\Ingreso;
use App\Models\Transaction;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Los atributos que se pueden asignar masivamente.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Los atributos que deben permanecer ocultos al serializar.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Relación: Un usuario tiene muchas transacciones.
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Relación: Un usuario tiene muchas categorías.
     */
    public function categorias()
    {
        return $this->hasMany(Categoria::class);
    }

    /**
     * Relación: Un usuario tiene muchos gastos.
     */
    public function gastos()
    {
        return $this->hasMany(Gasto::class);
    }

    /**
     * Relación: Un usuario tiene muchos ingresos.
     */
    public function ingresos()
    {
        return $this->hasMany(Ingreso::class);
    }
}
