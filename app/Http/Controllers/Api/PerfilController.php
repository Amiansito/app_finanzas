<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class PerfilController extends Controller
{
    // Obtener perfil del usuario autenticado
    public function show(Request $request)
    {
        return response()->json($request->user());
    }

    // Actualizar perfil (nombre, email, contraseña opcional)
    public function update(Request $request)
    {
        $user = $request->user();

    $request->validate([
        'name' => 'nullable|string|max:255',
        'email' => 'nullable|email|unique:users,email,' . $user->id,
        'password' => 'nullable|string|min:6|confirmed'
    ]);


        if ($request->filled('name')) {
            $user->name = $request->name;
        }

        if ($request->filled('email')) {
            $user->email = $request->email;
        }

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }


        $user->save();

        return response()->json([
            'message' => 'Perfil actualizado correctamente',
            'user' => $user
        ]);
    }

    // Eliminar cuenta del usuario
    public function destroy(Request $request)
    {
        $user = $request->user();
        $user->delete();

        return response()->json(['message' => 'Cuenta eliminada correctamente']);
    }
}
