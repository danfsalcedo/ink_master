<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\perfilEmpleado;
use App\Models\empleado;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class perfilEmpleadoControlador extends Controller
{
    public function listar()
    {
        $perfiles = perfilEmpleado::all();
    
        if ($perfiles->isEmpty()) {
            $data = [
                'mensaje' => 'No hay perfiles registrados',
                'status' => 404
            ];
            return response()->json($data, 404);
        }    
        return response()->json($perfiles, 200);
    }
   
    // Mostrar el perfil de un empleado específico
   public function mostrar($idEmpleado)
   {
       $perfil = perfilEmpleado::where('idEmpleado', $idEmpleado)->first();

       if (!$perfil) {
           return response()->json(['mensaje' => 'Perfil no encontrado'], 404);
       }

       return response()->json($perfil);
   }

   // Crear o actualizar perfil
   public function agregar(Request $request)
   {
       $request->validate([
           'idEmpleado' => 'required|exists:empleado,idEmpleado',
           'fotoEmpleado' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
           'historiaEmpleado' => 'nullable|string',
           'experienciaEmpleado' => 'nullable|string',
           'enfoquesEmpleado' => 'nullable|string',
       ]);

       $rutaImagen = null;

       if ($request->hasFile('fotoEmpleado')) {
           // Obtener el nombre del empleado desde la base de datos
           $empleado = empleado::find($request->idEmpleado);
           $nombreEmpleado = str_replace(' ', '_', strtolower($empleado->nombre)); // Reemplazar espacios por guiones bajos y convertir a minúsculas

           // Crear un nombre único basado en el nombre y el ID del empleado
           $extension = $request->file('fotoEmpleado')->getClientOriginalExtension();
           $nombreArchivo = $empleado->idEmpleado . '_' . $empleado->nombreEmpleado . '.' . $extension;

           // Guardar la imagen con el nombre personalizado
           $rutaImagen = $request->file('fotoEmpleado')->storeAs('public/assets/images', $nombreArchivo);
           $rutaImagen = str_replace('public/', '', $rutaImagen); // Ajustar la ruta para el acceso público
       }

       // Crear o actualizar el perfil
       $perfil = perfilEmpleado::updateOrCreate(
           ['idEmpleado' => $request->idEmpleado],
           [
               'fotoEmpleado' => $rutaImagen,
               'historiaEmpleado' => $request->historiaEmpleado,
               'experienciaEmpleado' => $request->experienciaEmpleado,
               'enfoquesEmpleado' => $request->enfoquesEmpleado,
           ]
       );

       return response()->json(['mensaje' => 'Perfil guardado correctamente', 'perfil' => $perfil]);
   }
}
