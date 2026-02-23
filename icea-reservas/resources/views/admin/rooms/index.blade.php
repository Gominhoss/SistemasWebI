<x-app-layout>
    <x-slot name="header">
        <div class="flex justify-between items-center">
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                {{ __('Gerenciamento de Salas') }}
            </h2>
            <a href="{{ route('admin.rooms.create') }}" class="bg-blue-600 text-white px-4 py-2 rounded text-sm font-bold hover:bg-blue-500 transition">Adicionar Nova Sala</a>
        </div>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <table class="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 border-b">
                            <th class="p-3">Nome</th>
                            <th class="p-3">Capacidade</th>
                            <th class="p-3">Localização</th>
                            <th class="p-3">Recursos</th>
                            <th class="p-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($rooms as $room)
                            <tr class="border-b hover:bg-gray-50">
                                <td class="p-3 font-medium">{{ $room->name }}</td>
                                <td class="p-3">{{ $room->capacity }} pessoas</td>
                                <td class="p-3">{{ $room->location }}</td>
                                <td class="p-3 text-xs text-gray-600">{{ $room->resources ?: '-' }}</td>
                                <td class="p-3 text-right space-x-2">
                                    <a href="{{ route('admin.rooms.edit', $room) }}" class="text-indigo-600 hover:text-indigo-900 font-bold">Editar</a>
                                    <form action="{{ route('admin.rooms.destroy', $room) }}" method="POST" class="inline-block" onsubmit="return confirm('Deseja realmente excluir esta sala?')">
                                        @csrf @method('DELETE')
                                        <button type="submit" class="text-red-600 hover:text-red-900 font-bold">Excluir</button>
                                    </form>
                                </td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</x-app-layout>
