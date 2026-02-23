<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'start_time' => 'required|date|after:now',
            'end_time' => 'required|date|after:start_time',
        ]);

        // Validação robusta contra sobreposição de horários
        if (Booking::hasConflict($request->room_id, $request->start_time, $request->end_time)) {
            return back()->withErrors(['error' => 'A sala já possui uma reserva no horário selecionado.'])->withInput();
        }

        auth()->user()->bookings()->create([
            'room_id' => $request->room_id,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
        ]);

        return redirect()->route('dashboard')->with('success', 'Reserva criada com sucesso!');
    }

    public function destroy(Booking $booking)
    {
        // Só permite que o dono ou admin delete (embora aqui seja rota de user, o admin usa a rota de admin)
        if ($booking->user_id !== auth()->id()) {
            abort(403);
        }

        $booking->delete();

        return back()->with('success', 'Reserva cancelada.');
    }
}
