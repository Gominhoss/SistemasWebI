<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Reservation; // Importação do modelo indicando onde a classe está

class ReservationController extends Controller
{
    public function index()
    {
        // Retorna todas as reservas (útil para a grade do calendário geral)
        return response()->json(Reservation::all());
    }

    public function store(Request $request)
    {
        // Pega os horários enviados na requisição pelo usuário
        $novoInicio = $request->start_time;
        $novoFim = $request->end_time;
        $idDaSala = $request->room_id;

        // Executa a trava matemática no banco de dados
        $existeConflito = Reservation::where('room_id', $idDaSala)
            ->where(function ($query) use ($novoInicio, $novoFim) {
                $query->where('start_time', '<', $novoFim)
                      ->where('end_time', '>', $novoInicio);
            })->exists();

        // Se a matemática confirmar o cruzamento de horários, bloqueia a ação
        if ($existeConflito) {
            return response()->json([
                'erro' => 'Conflito de horário detectado. A sala já está ocupada neste período.'
            ], 409); // Retorna um status HTTP 409 (Conflict)
        }

        // Se não houver conflito, o Controller prossegue salvando a reserva normalmente
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
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}