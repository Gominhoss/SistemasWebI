<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = ['user_id', 'room_id', 'titulo', 'descricao', 'start_time', 'end_time'];
}
