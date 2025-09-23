<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Ingreso;

class IngresoController extends Controller
{
    public function index()
    {
        return auth()->user()->ingresos()->with('categoria')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'monto'        => 'required|numeric|min:0',
            'descripcion'  => 'nullable|string|max:255',
            'fecha'        => 'required|date',
            'categoria_id' => 'required|exists:categorias,id'
        ]);

        $ingreso = auth()->user()->ingresos()->create($request->all());
        return response()->json($ingreso, 201);
    }

    public function show(Ingreso $ingreso)
    {
        $this->authorize('view', $ingreso);
        return response()->json($ingreso);
    }

    public function update(Request $request, Ingreso $ingreso)
    {
        $this->authorize('update', $ingreso);

        $request->validate([
            'monto'        => 'sometimes|required|numeric|min:0',
            'descripcion'  => 'nullable|string|max:255',
            'fecha'        => 'sometimes|required|date',
            'categoria_id' => 'sometimes|required|exists:categorias,id'
        ]);

        $ingreso->update($request->all());
        return response()->json($ingreso);
    }

    public function destroy(Ingreso $ingreso)
    {
        $this->authorize('delete', $ingreso);
        $ingreso->delete();
        return response()->json(['message' => 'Ingreso eliminado']);
    }
}
