<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Ingreso;

class IngresoPolicy
{
    public function view(User $user, Ingreso $ingreso): bool
    {
        return $user->id === $ingreso->user_id;
    }

    public function update(User $user, Ingreso $ingreso): bool
    {
        return $user->id === $ingreso->user_id;
    }

    public function delete(User $user, Ingreso $ingreso): bool
    {
        return $user->id === $ingreso->user_id;
    }
}
