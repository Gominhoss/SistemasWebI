<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Vitor (Admin Mestre)',
            'email' => 'admin@icea.br',
            'password' => 'senha123',
            'role' => 'admin',
        ]);

        \App\Models\Room::create([
            'nome' => 'Auditório Principal',
            'capacidade' => 100,
            'localizacao' => 'Bloco A',
            'recursos' => 'Projetor, Som, Ar Condicionado',
        ]);

        \App\Models\Room::create([
            'nome' => 'Laboratório de Informática 1',
            'capacidade' => 30,
            'localizacao' => 'Bloco B',
            'recursos' => '30 PCs, Ar Condicionado',
        ]);

        \App\Models\Room::create([
            'nome' => 'Sala de Reuniões',
            'capacidade' => 12,
            'localizacao' => 'Bloco C',
            'recursos' => 'TV 55", Quadro Branco',
        ]);
    }
}
