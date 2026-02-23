<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    // A constante é definida aqui
    private const ERRO_NAO_ENCONTRADO = 'Sala não encontrada';

    public function index()
    {
        return response()->json(Room::all());
    }

    public function store(Request $request)
    {
        $room = Room::create($request->all());
        return response()->json($room, 201);
    }

    public function show(string $id)
    {
        $room = Room::find($id);
        // A constante é chamada usando self::
        return $room ? response()->json($room) : response()->json(['erro' => self::ERRO_NAO_ENCONTRADO], 404);
    }

    public function update(Request $request, string $id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json(['erro' => self::ERRO_NAO_ENCONTRADO], 404);
        }
        
        $room->update($request->all());
        return response()->json($room);
    }

    public function destroy(string $id)
    {
        $room = Room::find($id);
        if (!$room) {
            return response()->json(['erro' => self::ERRO_NAO_ENCONTRADO], 404);
        }

        $room->delete();
        return response()->json(['mensagem' => 'Sala removida com sucesso']);
    }
}
