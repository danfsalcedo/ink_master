<?php

namespace App\Http\Controllers;

use App\Models\admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class adminControlador extends Controller
{
    public function listar()
    {
        $admin = admin::all();
        if ($admin->isEmpty()) {
            $data = [
                'message' => 'No hay administradores registrados',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        return response()->json($admin, 200);
    }

    // Agregar administrador
    public function agregar(Request $request)
    {
        $validacion = Validator::make($request->all(),
        [
            'correoAdmin' => 'required|email|unique:admin',
            'contrasenaAdmin' => 'required|min:8|max:70'
        ]);

        if ($validacion->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validacion->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $admin = admin::create(
            [
                'correoAdmin' => $request->correoAdmin,
                'contrasenaAdmin' => Hash::make($request->contrasenaAdmin)
            ]
        );

        if (!$admin) {
            $data = [
                'message' => 'Error al registrar el administrador',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'admin' => $admin->makeHidden('contrasenaAdmin'),
            'status' => 201
        ];
        return response()->json($data, 201);
    }

    // Listar por ID
    public function mostrar($idAdmin)
    {
        $admin = admin::find($idAdmin);
        if (!$admin) {
            $data = [
                'message' => 'Administrador no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $data = [
            'admin' => $admin->makeHidden('contrasenaAdmin'),
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    // Eliminar administrador
    public function eliminar($idAdmin)
    {
        $admin = admin::find($idAdmin);
        if (!$admin) {
            $data = [
                'message' => 'Administrador no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }
        $admin->delete();
        $data = [
            'message' => 'Administrador eliminado',
            'status' => 200
        ];
        return response()->json($data, 200);
    }

    // Modificar administrador
    public function modificar(Request $request, $idAdmin)
    {
        $admin = admin::find($idAdmin);
        if (!$admin) {
            $data = [
                'message' => 'Administrador no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validacion = Validator::make($request->all(), [
            'correoAdmin' => 'sometimes|email|unique:admin,correoAdmin,' . $idAdmin . ',idAdmin',
            'contrasenaAdmin' => 'nullable|min:8|max:70'
        ]);

        if ($validacion->fails()) {
            $data = [
                'message' => 'Error en la validación de datos',
                'errors' => $validacion->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $admin->fill($request->except(['contrasenaAdmin']));

        if ($request->filled('contrasenaAdmin')) {
            $admin->contrasenaAdmin = Hash::make($request->contrasenaAdmin);
        }

        $admin->save();

        $data = [
            'message' => 'Administrador actualizado',
            'admin' => $admin->makeHidden('contrasenaAdmin'),
            'status' => 200
        ];
        return response()->json($data, 200);
    }
}