<?php

namespace App\Models;

use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;

class admin extends Model implements JWTSubject
{
    use HasFactory;
    protected $table='admin';
    public $timestamps= true;
    protected $primaryKey = 'idAdmin';
    public $incrementing = true;
    protected $keyType = 'int';
    protected $fillable = [
        'correoAdmin',
        'contrasenaAdmin'
    ];

    protected $hidden = [
        'contrasenaAdmin',
        'created_at',
        'updated_at'
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'rol' => 'admin' // Agrega metadata útil al token
        ];
    }
}
