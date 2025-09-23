<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    public function index()
    {
        return auth()->user()->transactions()->with('categoria')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'monto'        => 'required|numeric|min:0',
            'tipo'         => 'required|in:ingreso,gasto',
            'descripcion'  => 'nullable|string|max:255',
            'fecha'        => 'required|date',
            'categoria_id' => 'required|exists:categorias,id'
        ]);

        $transaction = auth()->user()->transactions()->create($request->all());
        return response()->json($transaction, 201);
    }

    public function show(Transaction $transaction)
    {
        $this->authorize('view', $transaction);
        return response()->json($transaction);
    }

    public function update(Request $request, Transaction $transaction)
    {
        $this->authorize('update', $transaction);

        $request->validate([
            'monto'        => 'sometimes|required|numeric|min:0',
            'tipo'         => 'sometimes|required|in:ingreso,gasto',
            'descripcion'  => 'nullable|string|max:255',
            'fecha'        => 'sometimes|required|date',
            'categoria_id' => 'sometimes|required|exists:categorias,id'
        ]);

        $transaction->update($request->all());
        return response()->json($transaction);
    }

    public function destroy(Transaction $transaction)
    {
        $this->authorize('delete', $transaction);
        $transaction->delete();
        return response()->json(['message' => 'Transacción eliminada']);
    }
}
