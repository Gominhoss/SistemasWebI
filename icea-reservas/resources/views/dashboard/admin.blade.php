<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Visão Geral Administrativa') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <!-- Estatísticas -->
            <div class="bg-blue-500 text-white p-6 rounded-lg shadow-sm">
                <p class="text-sm font-medium uppercase opacity-80">Total de Salas</p>
                <h4 class="text-3xl font-bold">{{ $totalRooms }}</h4>
            </div>
            <div class="bg-green-500 text-white p-6 rounded-lg shadow-sm">
                <p class="text-sm font-medium uppercase opacity-80">Total de Reservas</p>
                <h4 class="text-3xl font-bold">{{ $totalBookings }}</h4>
            </div>
            <div class="bg-indigo-500 text-white p-6 rounded-lg shadow-sm">
                <p class="text-sm font-medium uppercase opacity-80">Novas (Próximas)</p>
                <h4 class="text-3xl font-bold">{{ $upcomingBookings->count() }}</h4>
            </div>
        </div>

        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            <!-- Últimas Reservas -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 class="text-lg font-medium mb-4 border-b pb-2">Próximas 10 Reservas (Global)</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left">
                        <thead>
                            <tr class="bg-gray-50 border-b">
                                <th class="p-3">Sala</th>
                                <th class="p-3">Usuário</th>
                                <th class="p-3">Horário</th>
                                <th class="p-3">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            @forelse($upcomingBookings as $booking)
                                <tr class="border-b hover:bg-gray-50">
                                    <td class="p-3 font-medium">{{ $booking->room->name }}</td>
                                    <td class="p-3 text-gray-600">{{ $booking->user->name }} ({{ $booking->user->role }})</td>
                                    <td class="p-3">{{ $booking->start_time->format('d/m/Y H:i') }} - {{ $booking->end_time->format('H:i') }}</td>
                                    <td class="p-3">
                                        <form action="{{ route('admin.bookings.destroy', $booking) }}" method="POST" onsubmit="return confirm('Cancelar reserva do usuário?')">
                                            @csrf @method('DELETE')
                                            <button class="text-red-600 hover:text-red-900 font-bold">Cancelar</button>
                                        </form>
                                    </td>
                                </tr>
                            @empty
                                <tr>
                                    <td colspan="4" class="p-3 text-center text-gray-500 italic">Sem reservas futuras registradas.</td>
                                </tr>
                            @endforelse
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="flex justify-center gap-4">
                <a href="{{ route('admin.rooms.index') }}" class="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">Gerenciar Salas</a>
                <a href="{{ route('admin.bookings.index') }}" class="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-500 transition">Ver Todas Reservas</a>
            </div>
        </div>
    </div>
</x-app-layout>
