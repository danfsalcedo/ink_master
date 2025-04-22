<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePerfilEmpleadoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('perfil_empleado', function (Blueprint $table) {
            $table->id('idPerfil');
            $table->unsignedBigInteger('idEmpleado')->unique(); // relación 1 a 1

            $table->string('fotoEmpleado')->nullable();
            $table->text('historiaEmpleado')->nullable();
            $table->text('experienciaEmpleado')->nullable();
            $table->text('enfoquesEmpleado')->nullable();

            $table->timestamps();

            $table->foreign('idEmpleado')->references('idEmpleado')->on('empleado')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('perfil_empleado');
    }
}
