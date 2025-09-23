<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    public function index()
    {
        // Listar todas las categorías del usuario autenticado
        return auth()->user()->categorias()->get();
    }

    public function store(Request $request)
    {
        // Validación de los datos recibidos
        $request->validate([
            'nombre' => 'required|string|max:100',
            'tipo'   => 'required|in:ingreso,gasto'
        ]);

        // Crear la categoría vinculada al usuario logueado
        $categoria = auth()->user()->categorias()->create([
            'nombre' => $request->nombre,
            'tipo'   => $request->tipo
        ]);

        return response()->json($categoria, 201);
    }

    public function show(Categoria $categoria)
    {
        // Asegurarse de que la categoría pertenezca al usuario
        $this->authorize('view', $categoria);
        return response()->json($categoria);
    }

    public function update(Request $request, Categoria $categoria)
    {
        // Validar que el usuario pueda modificar la categoría
        $this->authorize('update', $categoria);

        $request->validate([
            'nombre' => 'sometimes|required|string|max:100',
            'tipo'   => 'sometimes|required|in:ingreso,gasto'
        ]);

        $categoria->update([
            'nombre' => $request->nombre ?? $categoria->nombre,
            'tipo'   => $request->tipo ?? $categoria->tipo
        ]);

        return response()->json($categoria);
    }

    public function destroy(Categoria $categoria)
    {
        // Validar que el usuario pueda eliminar la categoría
        $this->authorize('delete', $categoria);

        $categoria->delete();
        return response()->json(['message' => 'Categoría eliminada']);
    }
}
