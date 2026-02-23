<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Editar Sala: ') }} {{ $room->name }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-2xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                <form action="{{ route('admin.rooms.update', $room) }}" method="POST" class="space-y-4">
                    @csrf
                    @method('PUT')
                    <div>
                        <x-input-label for="name" :value="__('Nome da Sala')" />
                        <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" :value="old('name', $room->name)" required autofocus />
                        <x-input-error :messages="$errors->get('name')" class="mt-2" />
                    </div>

                    <div>
                        <x-input-label for="capacity" :value="__('Capacidade (Pessoas)')" />
                        <x-text-input id="capacity" class="block mt-1 w-full" type="number" name="capacity" :value="old('capacity', $room->capacity)" required />
                        <x-input-error :messages="$errors->get('capacity')" class="mt-2" />
                    </div>

                    <div>
                        <x-input-label for="location" :value="__('Localização / Prédio')" />
                        <x-text-input id="location" class="block mt-1 w-full" type="text" name="location" :value="old('location', $room->location)" required />
                        <x-input-error :messages="$errors->get('location')" class="mt-2" />
                    </div>

                    <div>
                        <x-input-label for="resources" :value="__('Recursos (Ex: Projetor, Ar-condicionado)')" />
                        <textarea id="resources" name="resources" rows="3" class="block mt-1 w-full border-gray-300 rounded-md shadow-sm">{{ old('resources', $room->resources) }}</textarea>
                        <x-input-error :messages="$errors->get('resources')" class="mt-2" />
                    </div>

                    <div class="flex items-center justify-end mt-4 gap-4">
                        <a href="{{ route('admin.rooms.index') }}" class="text-sm text-gray-600 hover:text-gray-900">Cancelar</a>
                        <x-primary-button class="ml-4">
                            {{ __('Salvar Alterações') }}
                        </x-primary-button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</x-app-layout>
