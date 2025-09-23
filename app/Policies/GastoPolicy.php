<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Gasto;

class GastoPolicy
{
    public function view(User $user, Gasto $gasto): bool
    {
        return $user->id === $gasto->user_id;
    }

    public function update(User $user, Gasto $gasto): bool
    {
        return $user->id === $gasto->user_id;
    }

    public function delete(User $user, Gasto $gasto): bool
    {
        return $user->id === $gasto->user_id;
    }
}
