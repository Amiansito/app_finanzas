<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ingresos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');        // Relación con usuarios
            $table->unsignedBigInteger('categoria_id');   // Relación con categorías
            $table->string('descripcion');
            $table->decimal('monto', 10, 2);
            $table->date('fecha');
            $table->timestamps();

            // Llaves foráneas
            $table->foreign('user_id')
                  ->references('id')->on('users')
                  ->onDelete('cascade');

            $table->foreign('categoria_id')
                  ->references('id')->on('categorias')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('ingresos');
    }
};
