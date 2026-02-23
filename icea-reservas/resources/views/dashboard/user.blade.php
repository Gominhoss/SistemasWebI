<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Minhas Reservas') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
            @if(session('success'))
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    {{ session('success') }}
                </div>
            @endif

            @if($errors->any())
                <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {{ $errors->first() }}
                </div>
            @endif

            <!-- Nova Reserva -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 class="text-lg font-medium mb-4">Solicitar Nova Reserva</h3>
                <form action="{{ route('bookings.store') }}" method="POST" class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    @csrf
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Sala</label>
                        <select name="room_id" required class="mt-1 block w-full rounded-md border-gray-300">
                            @foreach($rooms as $room)
                                <option value="{{ $room->id }}">{{ $room->name }} (Cap: {{ $room->capacity }})</option>
                            @endforeach
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Início</label>
                        <input type="datetime-local" name="start_time" required class="mt-1 block w-full rounded-md border-gray-300">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700">Fim</label>
                        <input type="datetime-local" name="end_time" required class="mt-1 block w-full rounded-md border-gray-300">
                    </div>
                    <div class="flex items-end">
                        <x-primary-button class="w-full justify-center">Reservar</x-primary-button>
                    </div>
                </form>
            </div>

            <!-- Grade de Disponibilidade -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 class="text-lg font-medium mb-4">Grade de Ocupação Hoje</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left border-collapse">
                        <thead>
                            <tr class="bg-gray-50">
                                <th class="p-2 border">Sala / Hora</th>
                                @for($i = 7; $i <= 22; $i++)
                                    <th class="p-2 border text-center">{{ $i }}:00</th>
                                @endfor
                            </tr>
                        </thead>
                        <tbody>
                            @foreach($rooms as $room)
                                <tr>
                                    <td class="p-2 border font-medium bg-gray-50">{{ $room->name }}</td>
                                    @for($h = 7; $h <= 22; $h++)
                                        @php
                                            $currentTime = today()->addHours($h);
                                            $isBusy = $todayBookings->where('room_id', $room->id)
                                                ->filter(fn($b) => $b->start_time->hour <= $h && $b->end_time->hour > $h)
                                                ->isNotEmpty();
                                        @endphp
                                        <td class="p-2 border text-center {{ $isBusy ? 'bg-red-500 text-white' : 'bg-green-100 text-green-800' }}">
                                            {{ $isBusy ? 'Ocupado' : 'Livre' }}
                                        </td>
                                    @endfor
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Minhas Próximas Reservas -->
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <h3 class="text-lg font-medium mb-4">Minhas Próximas Reservas</h3>
                <div class="divide-y">
                    @forelse($myUpcomingBookings as $booking)
                        <div class="py-3 flex justify-between items-center">
                            <div>
                                <span class="font-bold">{{ $booking->room->name }}</span>
                                <span class="text-sm text-gray-600 ml-2">
                                    {{ $booking->start_time->format('d/m/Y H:i') }} até {{ $booking->end_time->format('H:i') }}
                                </span>
                            </div>
                            <form action="{{ route('bookings.destroy', $booking) }}" method="POST" onsubmit="return confirm('Confirmar cancelamento?')">
                                @csrf @method('DELETE')
                                <button class="text-red-600 hover:text-red-900 text-sm font-bold">Cancelar</button>
                            </form>
                        </div>
                    @empty
                        <p class="text-gray-500 italic">Nenhuma reserva agendada.</p>
                    @endforelse
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
