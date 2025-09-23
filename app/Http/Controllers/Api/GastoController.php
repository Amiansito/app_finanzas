<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Gasto;

class GastoController extends Controller
{
    public function index()
    {
        return auth()->user()->gastos()->with('categoria')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'monto'        => 'required|numeric|min:0',
            'descripcion'  => 'nullable|string|max:255',
            'fecha'        => 'required|date',
            'categoria_id' => 'required|exists:categorias,id'
        ]);

        $gasto = auth()->user()->gastos()->create($request->all());
        return response()->json($gasto, 201);
    }

    public function show(Gasto $gasto)
    {
        $this->authorize('view', $gasto);
        return response()->json($gasto);
    }

    public function update(Request $request, Gasto $gasto)
    {
        $this->authorize('update', $gasto);

        $request->validate([
            'monto'        => 'sometimes|required|numeric|min:0',
            'descripcion'  => 'nullable|string|max:255',
            'fecha'        => 'sometimes|required|date',
            'categoria_id' => 'sometimes|required|exists:categorias,id'
        ]);

        $gasto->update($request->all());
        return response()->json($gasto);
    }

    public function destroy(Gasto $gasto)
    {
        $this->authorize('delete', $gasto);
        $gasto->delete();
        return response()->json(['message' => 'Gasto eliminado']);
    }
}
