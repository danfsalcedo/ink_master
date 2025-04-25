<?php

use App\Http\Controllers\ClienteControlador;
use App\Http\Controllers\empleadoControlador;
use App\Http\Controllers\loginControlador;
use App\Http\Controllers\citaControlador;
use App\Http\Controllers\adminControlador;
use App\Http\Controllers\perfilEmpleadoControlador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;



Route::post('/login', [loginControlador::class, 'login']);

Route::get('/clientes',[ClienteControlador::class,'listar']);
Route::get('/clientes/{idCliente}',[ClienteControlador::class,'mostrar']);
Route::post('/clientes',[ClienteControlador::class,'agregar']);
Route::put('/clientes/{idCliente}',[ClienteControlador::class,'modificar']);
Route::delete('/clientes/{idCliente}',[ClienteControlador::class,'eliminar']);

Route::get('/empleados', [empleadoControlador::class, 'listar']);
Route::get('/empleados/{idEmpleado}', [empleadoControlador::class, 'mostrar']);
Route::post('/empleados', [empleadoControlador::class, 'agregar']);
Route::put('/empleados/{idEmpleado}', [empleadoControlador::class, 'modificar']);
Route::delete('/empleados/{idEmpleado}', [empleadoControlador::class, 'eliminar']);

Route::get('/admin',[adminControlador::class,'listar']);
Route::get('/admin/{idAdmin}',[adminControlador::class,'mostrar']);
Route::post('/admin',[adminControlador::class,'agregar']);
Route::put('/admin/{idAdmin}',[adminControlador::class,'modificar']);
Route::delete('/admin/{idAdmin}',[adminControlador::class,'eliminar']);

Route::get('/citas', [citaControlador::class, 'listar']);
Route::get('/citas/{idCita}', [citaControlador::class, 'mostrar']);
Route::post('/citas', [citaControlador::class, 'agregar']);
Route::put('/citas/{idCita}', [citaControlador::class, 'actualizar']);
Route::delete('/citas/{idCita}', [citaControlador::class, 'eliminar']);

Route::get('/perfil', [perfilEmpleadoControlador::class, 'listar']);
Route::get('/perfil/{idEmpleado}', [perfilEmpleadoControlador::class, 'mostrar']);
Route::post('/perfil', [perfilEmpleadoControlador::class, 'agregar']);
Route::put('/perfil/{idEmpleado}', [perfilEmpleadoControlador::class, 'modificar']);
