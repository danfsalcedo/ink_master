<?php

namespace App\Http\Controllers;

use App\Models\cliente;
use App\Models\empleado;
use App\Models\admin;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;

class loginControlador extends Controller
{
    public function login(Request $request)
    {
        $correo = $request->input('correo');
        $contrasena = $request->input('contrasena');

        // Cliente
        $cliente = cliente::where('correoCliente', $correo)->first();
        if ($cliente && Hash::check($contrasena, $cliente->contrasenaCliente)) {
            $token = JWTAuth::claims(['tipo' => 'cliente'])->fromUser($cliente);
            return response()->json([
                'message' => 'Inicio de sesión exitoso',
                'token' => $token,
                'tipo' => 'cliente',
                'idEmpleado' => $cliente->idCliente,
                'cliente' => $cliente,
                'status' => 200
            ], 200);
        }

        // Empleado
        $empleado = empleado::where('correoEmpleado', $correo)->first();
        if ($empleado && Hash::check($contrasena, $empleado->contrasenaEmpleado)) {
            $token = JWTAuth::claims(['tipo' => 'empleado'])->fromUser($empleado);
            return response()->json([
                'message' => 'Inicio de sesión exitoso',
                'token' => $token,
                'tipo' => 'empleado',
                'idEmpleado' => $empleado->idEmpleado, // Añadir el ID del empleado
                'empleado' => $empleado,
                'status' => 200
            ], 200);
        }

        // Admin
        $admin = admin::where('correoAdmin', $correo)->first();
        if ($admin && Hash::check($contrasena, $admin->contrasenaAdmin)) {
            $token = JWTAuth::claims(['tipo' => 'administrador'])->fromUser($admin);
            return response()->json([
                'message' => 'Inicio de sesión exitoso',
                'token' => $token,
                'tipo' => 'administrador',
                'idEmpleado' => $admin->idAdmin,
                'usuario' => $admin,
                'status' => 200
            ], 200);
        }

        // Credenciales inválidas
        return response()->json([
            'message' => 'Usuario no encontrado o credenciales incorrectas',
            'status' => 404
        ], 404);
    }
}
