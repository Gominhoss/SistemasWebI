<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'room_id',
        'start_time',
        'end_time',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Verifica se há conflito de horário para uma sala.
     * Implementação robusta de sobreposição matemática: (S1 < E2) AND (S2 < E1)
     */
    public static function hasConflict($roomId, $startTime, $endTime, $excludeId = null)
    {
        return self::where('room_id', $roomId)
            ->when($excludeId, fn($query) => $query->where('id', '!=', $excludeId))
            ->where('start_time', '<', $endTime)
            ->where('end_time', '>', $startTime)
            ->exists();
    }
}
