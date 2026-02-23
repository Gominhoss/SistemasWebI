<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation;

class ReservationController extends Controller
{
    // Constante definida para limpar o aviso do SonarQube
    private const ERRO_NAO_ENCONTRADO = 'Reserva não encontrada.';

    public function index()
    {
        return response()->json(Reservation::all());
    }

    public function store(Request $request)
    {
        $novoInicio = $request->start_time;
        $novoFim = $request->end_time;
        $idDaSala = $request->room_id;

        $existeConflito = Reservation::where('room_id', $idDaSala)
            ->where(function ($query) use ($novoInicio, $novoFim) {
                $query->where('start_time', '<', $novoFim)
                      ->where('end_time', '>', $novoInicio);
            })->exists();

        if ($existeConflito) {
            return response()->json([
                'erro' => 'Conflito de horário detectado. A sala já está ocupada neste período.'
            ], 409);
        }

        $reserva = new Reservation();
        $reserva->user_id = $request->user_id;
        $reserva->room_id = $idDaSala;
        $reserva->titulo = $request->titulo;
        $reserva->descricao = $request->descricao;
        $reserva->start_time = $novoInicio;
        $reserva->end_time = $novoFim;
        $reserva->save();

        return response()->json([
            'mensagem' => 'Reserva efetuada com sucesso!',
            'reserva' => $reserva
        ], 201);
    }

    public function show(string $id)
    {
        $reserva = Reservation::find($id);
        
        if (!$reserva) {
            // Chamando a constante
            return response()->json(['erro' => self::ERRO_NAO_ENCONTRADO], 404);
        }

        return response()->json($reserva);
    }

    public function update(Request $request, string $id)
    {
        $reserva = Reservation::find($id);
        
        if (!$reserva) {
            return response()->json(['erro' => self::ERRO_NAO_ENCONTRADO], 404);
        }

        if ($request->has('start_time') && $request->has('end_time')) {
            $novoInicio = $request->start_time;
            $novoFim = $request->end_time;
            $idDaSala = $request->room_id ?? $reserva->room_id;

            $existeConflito = Reservation::where('room_id', $idDaSala)
                ->where('id', '!=', $id)
                ->where(function ($query) use ($novoInicio, $novoFim) {
                    $query->where('start_time', '<', $novoFim)
                          ->where('end_time', '>', $novoInicio);
                })->exists();

            if ($existeConflito) {
                return response()->json([
                    'erro' => 'Conflito de horário detectado. A sala já está ocupada neste período.'
                ], 409);
            }
        }

        $reserva->update($request->all());

        return response()->json([
            'mensagem' => 'Reserva atualizada com sucesso!',
            'reserva' => $reserva
        ], 200);
    }

    public function destroy(string $id)
    {
        $reserva = Reservation::find($id);
        
        if (!$reserva) {
            return response()->json(['erro' => self::ERRO_NAO_ENCONTRADO], 404);
        }

        $reserva->delete();

        return response()->json(['mensagem' => 'Reserva excluída com sucesso!'], 200);
    }
}
