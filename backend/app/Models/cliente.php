<?php

namespace App\Models;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class cliente extends Model implements JWTSubject
{
    use HasFactory;
    protected $table='cliente';
    public $timestamps= true;
    protected $primaryKey = 'idCliente';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'correoCliente',
        'contrasenaCliente',
        'nombreCliente',
        'apellidoCliente',
        'telefonoCliente'
    ];
    
    public function getJWTIdentifier(){
        return $this-> getKey();
    }
    public function getJWTCustomClaims(){
        return[
            'rol' => 'cliente'
        ];
    }
}
