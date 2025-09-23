<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            // Relación con usuarios
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Relación con categorías
            $table->foreignId('categoria_id')->constrained('categorias')->onDelete('cascade');

            // Tipo de transacción: ingreso o gasto
            $table->enum('tipo', ['ingreso', 'gasto']);

            // Monto de la transacción
            $table->decimal('monto', 10, 2);

            // Descripción opcional
            $table->string('descripcion')->nullable();

            // Fecha de la transacción
            $table->date('fecha');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
