<?php

namespace App\Models;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\perfilEmpleado;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class empleado extends Model implements JWTSubject
{
    use HasFactory;
    protected $table='empleado';
    public $timestamps=false;
    protected $primaryKey = 'idEmpleado';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'nombreEmpleado',
        'correoEmpleado',
        'contrasenaEmpleado',
        'telefonoEmpleado'
    ];

    public function getJWTIdentifier(){
        return $this-> getKey();
    }
    public function getJWTCustomClaims(){
        return[
            'rol' => 'empelado'
        ];
    }

    public function perfil()
    {
        return $this->hasOne(perfilEmpleado::class, 'idEmpleado');
    }
}
