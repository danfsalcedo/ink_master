<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\cliente;
use App\Models\empleado;

class CitaModelo extends Model
{
    use HasFactory;

    protected $table = 'cita';
    public $timestamps = false;
    protected $primaryKey = 'idCita';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'fechaCita',
        'horaCita',
        'idCliente',
        'idEmpleado'
    ];

    // Relación con el cliente
    public function cliente()
    {
        return $this->belongsTo(cliente::class, 'idCliente');
    }

    // Relación con el empleado
    public function empleado()
    {
        return $this->belongsTo(empleado::class, 'idEmpleado');
    }
}
