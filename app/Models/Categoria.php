<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;

    protected $fillable = ['nombre', 'tipo', 'user_id'];

    // Relación con usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
