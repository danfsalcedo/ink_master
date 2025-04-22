<?php

namespace App\Http\Controllers;
use App\Models\cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;


class ClienteControlador extends controller
{
    public function listar (){
        $cliente = cliente::all();
        if ($cliente ->isEmpty()){
            $data=[
                'message'=>'No hay clientes registrados',
                'status'=>404
            ];
            return response()->json($data,404);
        }
        return response()->json($cliente,200);
    }

    //agregar cliente
    public function agregar(Request $request){
        $validacion=Validator::make($request->all(),
        [
            'correoCliente'=>'Required|email',
            'nombreCliente'=>'Required|min:2|max:20',
            'apellidoCliente'=>'Required|min:2|max:20',
            'telefonoCliente'=>'Required|min:2|max:20',
            'contrasenaCliente'=>'Required|min:8|max:20'
        ]);
        if($validacion->fails()){
            $data=[
                'message'=>'Error en la validacion de datos',
                'errors'=>$validacion->errors(),
                'status'=>200
            ];
            return response()->json($data,400);
        }

        $cliente = cliente::create(
            [
                'correoCliente'=>$request->correoCliente,
                'nombreCliente'=>$request->nombreCliente,
                'apellidoCliente'=>$request->apellidoCliente,
                'telefonoCliente'=>$request->telefonoCliente,
                'contrasenaCliente'=>Hash::make($request->contrasenaCliente)
            ]
        );

        if(!$cliente){
            $data=[
                'message'=>'Error al registrar el cliente',
                'status'=>500
            ];
            return response()->json($data,500);
        }
        $data=[
            'cliente'=>$cliente,
            'status'=>201
        ];
        return response()->json($data,201);
    }

    //Listar por ID
    public function mostrar($idCliente){
        $cliente = cliente::find($idCliente);
        if(!$cliente){
            $data=[
                'message'=>'Cliente No Encontrado!',
                'status'=>404
            ];
            return response()->json($data,404);
        }
        $data=[
            'cliente'=>$cliente,
            'status'=>200
        ];
        return response()->json($data,200);
    }

    //eliminar cliente
    public function eliminar($idCliente){
        $cliente = cliente::find($idCliente);
        if(!$cliente){
            $data=[
                'message'=>'Cliente no encontrado',
                'status'=>404
            ];
            return response()->json($data,404);
        }
        $cliente->delete();
        $data=[
            'message'=>'Cliente eliminado',
            'status'=>200
        ];
        return response()->json($data,200);
    }

    //Modificar cliente
    public function modificar(Request $request, $idCliente) {
        $cliente = cliente::findOrFail($idCliente);
        
        $validacion = Validator::make($request->all(), [
            'correoCliente' => 'required|email',
            'nombreCliente' => 'required|min:2|max:20',
            'apellidoCliente' => 'required|min:2|max:20',
            'telefonoCliente' => 'required|min:2|max:20',
            'contrasenaCliente' => 'nullable|min:8|max:70'
        ]);
    
        if ($validacion->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validacion->errors()
            ], 400);
        }
    
        $cliente->fill($request->only([
            'correoCliente',
            'nombreCliente',
            'apellidoCliente',
            'telefonoCliente'
        ]));
    
        if ($request->filled('contrasenaCliente')) {
            $cliente->contrasenaCliente = $request->contrasenaCliente; // El mutator hasheará automáticamente
        }
    
        $cliente->save();
    
        return response()->json([
            'message' => 'Cliente actualizado',
            'data' => $cliente->makeHidden('contrasenaCliente') // Ocultar hash en respuesta
        ], 200);
    }
 
}
