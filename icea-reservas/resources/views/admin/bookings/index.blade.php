<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Todas as Reservas do Sistema') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <table class="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 border-b">
                            <th class="p-3">Sala</th>
                            <th class="p-3">Usuário</th>
                            <th class="p-3">Início</th>
                            <th class="p-3">Término</th>
                            <th class="p-3">Status</th>
                            <th class="p-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($bookings as $booking)
                            <tr class="border-b hover:bg-gray-50">
                                <td class="p-3 font-medium">{{ $booking->room->name }}</td>
                                <td class="p-3">{{ $booking->user->name }} ({{ $booking->user->role }})</td>
                                <td class="p-3">{{ $booking->start_time->format('d/m/Y H:i') }}</td>
                                <td class="p-3">{{ $booking->end_time->format('d/m/Y H:i') }}</td>
                                <td class="p-3">
                                    @if($booking->end_time->isPast())
                                        <span class="text-gray-500 italic">Encerrada</span>
                                    @else
                                        <span class="text-green-600 font-bold">Ativa</span>
                                    @endif
                                </td>
                                <td class="p-3 text-right">
                                    <form action="{{ route('admin.bookings.destroy', $booking) }}" method="POST" class="inline-block" onsubmit="return confirm('Cancelar esta reserva permanentemente?')">
                                        @csrf @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:text-red-900 font-bold">Cancelar</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
                <div class="mt-4">
                    {{ $bookings->links() }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>
