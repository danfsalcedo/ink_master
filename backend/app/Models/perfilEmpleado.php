<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\empleado;

class perfilEmpleado extends Model
{
    use HasFactory;

    protected $table = 'perfil_empleado';
    public $timestamps = false;
    protected $primaryKey = 'idPerfil';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'idEmpleado',
        'fotoEmpleado',
        'historiaEmpleado',
        'experienciaEmpleado',
        'enfoquesEmpleado'
    ];

    public function empleado()
    {
        return $this->belongsTo(empleado::class, 'idEmpleado');
    }
}
