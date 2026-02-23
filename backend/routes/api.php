<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RoomController;

Route::get(uri: '/user', action: function (Request $request) {
    return $request->user();
})->middleware(middleware: 'auth:sanctum');

// O apiResource cria todas as rotas de CRUD automaticamente para as Controllers
Route::apiResource(name: 'reservas', controller: ReservationController::class);
Route::apiResource(name: 'salas', controller: RoomController::class);
