<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

Route::get(uri: '/user', action: function (Request $request) {
    return $request->user();
})->middleware(middleware: 'auth:sanctum');
Route::get(uri: '/reservas', action: [ReservationController::class, 'index']);
Route::post(uri: '/reservas', action: [ReservationController::class, 'store']);
