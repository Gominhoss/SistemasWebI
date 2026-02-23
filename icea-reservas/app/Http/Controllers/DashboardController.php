<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $rooms = Room::all();

        if ($user->isAdmin()) {
            $totalRooms = Room::count();
            $totalBookings = Booking::count();
            $upcomingBookings = Booking::with(['user', 'room'])
                ->where('start_time', '>=', now())
                ->orderBy('start_time')
                ->take(10)
                ->get();

            return view('dashboard.admin', compact('totalRooms', 'totalBookings', 'upcomingBookings', 'rooms'));
        }

        $myUpcomingBookings = Booking::with('room')
            ->where('user_id', $user->id)
            ->where('start_time', '>=', now())
            ->orderBy('start_time')
            ->get();

        $todayBookings = Booking::with('room')
            ->whereDate('start_time', today())
            ->get();

        return view('dashboard.user', compact('myUpcomingBookings', 'rooms', 'todayBookings'));
    }
}
