<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\citaModelo;

class citaControlador extends Controller
{
    // Agregar una nueva cita
    public function agregar(Request $request)
    {
        $cita = new citaModelo();
        $cita->fechaCita = $request->input('fechaCita');
        $cita->horaCita = $request->input('horaCita');
        $cita->idCliente = $request->input('idCliente');
        $cita->idEmpleado = $request->input('idEmpleado');

        $cita->save();

        return response()->json([
            'message' => 'Cita registrada exitosamente',
            'status' => 200
        ]);
    }

    // Listar todas las citas
    public function listar()
{
    $citas = citaModelo::select('idCita', 'fechaCita', 'horaCita', 'idCliente', 'idEmpleado')
        ->with([
            'cliente:idCliente,nombreCliente,apellidoCliente',
            'empleado:idEmpleado,nombreEmpleado'
        ])
        ->get();

    return response()->json($citas);
}

    //Listar por ID
    public function mostrar($idCita){
        $cita = citaModelo::find($idCita);
        if(!$cita){
            $data=[
                'message'=>'Cita No Encontrada!',
                'status'=>404
            ];
            return response()->json($data,404);
        }
        $data=[
            'cita'=>$cita,
            'status'=>200
        ];
        return response()->json($data,200);
    }

    // Eliminar una cita por su ID
    public function eliminar($id)
    {
        $cita = citaModelo::find($id);
        if ($cita) {
            $cita->delete();
            return response()->json([
                'message' => 'Cita eliminada exitosamente',
                'status' => 200
            ]);
        } else {
            return response()->json([
                'message' => 'Cita no encontrada',
                'status' => 404
            ]);
        }
    }

    // Actualizar una cita
    public function actualizar(Request $request, $id)
    {
        $cita = citaModelo::find($id);
        if ($cita) {
            $cita->fechaCita = $request->input('fechaCita');
            $cita->horaCita = $request->input('horaCita');
            $cita->idCliente = $request->input('idCliente');
            $cita->idEmpleado = $request->input('idEmpleado');

            $cita->save();

            return response()->json([
                'message' => 'Cita actualizada exitosamente',
                'status' => 200
            ]);
        } else {
            return response()->json([
                'message' => 'Cita no encontrada',
                'status' => 404
            ]);
        }
    }

    // Obtener citas por empleado con datos del cliente
    public function obtenerCitasPorEmpleado(Request $request)
    {
        $idEmpleado = $request->input('idEmpleado');

        $citas = citaModelo::where('idEmpleado', $idEmpleado)
            ->with('cliente') // relación con clienteModelo
            ->get();

        if ($citas->isEmpty()) {
            return response()->json([
                'message' => 'No hay citas para este empleado',
                'status' => 404
            ], 404);
        }

        return response()->json([
            'citas' => $citas,
            'status' => 200
        ], 200);
    }
}