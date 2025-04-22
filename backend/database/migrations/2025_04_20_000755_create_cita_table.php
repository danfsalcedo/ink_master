<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCitaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cita', function (Blueprint $table) {
            $table->id('idCita');
            $table->date('fechaCita');
            $table->time('horaCita');

            $table->unsignedBigInteger('idCliente');
            $table->unsignedBigInteger('idEmpleado');

            $table->foreign('idCliente')->references('idCliente')->on('cliente')->onDelete('cascade');
            $table->foreign('idEmpleado')->references('idEmpleado')->on('empleado')->onDelete('cascade');
                
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cita');
    }
}
