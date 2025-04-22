<?php

namespace App\Http\Controllers;
use App\Models\empleado;
use App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class empleadoControlador extends Controller
{
     // Listar empleados
     public function listar()
     {
         $empleados = empleado::all();
 
         if ($empleados->isEmpty()) {
             return response()->json([
                 'message' => 'No hay empleados registrados',
                 'status' => 404
             ], 404);
         }
 
         return response()->json($empleados, 200);
     }
 
     // Agregar empleado
     public function agregar(Request $request)
     {
         $validacion = Validator::make($request->all(), [
             'nombreEmpleado' => 'required|min:2|max:20',
             'correoEmpleado' => 'required|email',
             'contrasenaEmpleado' => 'required|min:8|max:20',
             'telefonoEmpleado' => 'required|min:7|max:20'
         ]);
 
         if ($validacion->fails()) {
             return response()->json([
                 'message' => 'Error en la validación de datos',
                 'errors' => $validacion->errors(),
                 'status' => 400
             ], 400);
         }
 
         $empleado = empleado::create([
             'nombreEmpleado' => $request->nombreEmpleado,
             'correoEmpleado' => $request->correoEmpleado,
             'contrasenaEmpleado' => Hash::make($request->contrasenaEmpleado),
             'telefonoEmpleado' => $request->telefonoEmpleado
         ]);
 
         return response()->json([
             'empleado' => $empleado,
             'status' => 201
         ], 201);
     }
 
     // Mostrar empleado por ID
     public function mostrar($idEmpleado)
     {
         $empleado = empleado::find($idEmpleado);
 
         if (!$empleado) {
             return response()->json([
                 'message' => 'Empleado no encontrado',
                 'status' => 404
             ], 404);
         }
 
         return response()->json($empleado, 200);
     }
 
     //eliminar cliente
     public function eliminar($idEmpleado){
         $empleado = empleado::find($idEmpleado);
         if(!$empleado){
             $data=[
                 'message'=>'Empleado no encontrado',
                 'status'=>404
             ];
             return response()->json($data,404);
         }
         $empleado->delete();
         $data=[
             'message'=>'Empleado eliminado',
             'status'=>200
         ];
         return response()->json($data,200);
     }
 
     // Modificar empleado
     public function modificar(Request $request, $idEmpleado)
     {
         $empleado = empleado::find($idEmpleado);
 
         if (!$empleado) {
             return response()->json([
                 'message' => 'Empleado no encontrado',
                 'status' => 404
             ], 404);
         }
 
         $validacion = Validator::make($request->all(), [
             'nombreEmpleado' => 'required|min:2|max:20',
             'correoEmpleado' => 'required|email|unique:empleados,correoEmpleado,' . $idEmpleado . ',idEmpleado',
             'telefonoEmpleado' => 'required|min:7|max:20',
             'contrasenaEmpleado' => 'nullable|min:8|max:70'
         ]);
 
         if ($validacion->fails()) {
             return response()->json([
                 'message' => 'Error en la validación de datos',
                 'errors' => $validacion->errors(),
                 'status' => 400
             ], 400);
         }
 
         $empleado->nombreEmpleado = $request->nombreEmpleado;
         $empleado->correoEmpleado = $request->correoEmpleado;
         $empleado->telefonoEmpleado = $request->telefonoEmpleado;
 
         if ($request->has('contrasenaEmpleado') && !empty($request->contrasenaEmpleado)) {
             $empleado->contrasenaEmpleado = Hash::make($request->contrasenaEmpleado);
         }
 
         $empleado->save();
 
         return response()->json([
             'message' => 'Empleado modificado exitosamente',
             'empleado' => $empleado,
             'status' => 200
         ], 200);
     }
}
