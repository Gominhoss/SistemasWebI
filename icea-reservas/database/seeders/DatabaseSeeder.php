<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Room;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Criar Admin
        User::create([
            'name' => 'Administrador ICEA',
            'email' => 'admin@icea.ufop.br',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // Criar Usuário Comum
        User::create([
            'name' => 'João Aluno',
            'email' => 'aluno@icea.ufop.br',
            'password' => Hash::make('user123'),
            'role' => 'aluno',
        ]);

        // Criar Salas
        Room::create([
            'name' => 'Auditório',
            'capacity' => 100,
            'location' => 'Bloco A, Piso 1',
            'resources' => 'Projetor 4K, Sistema de Som, Microfones',
        ]);

        Room::create([
            'name' => 'Sala de Reuniões 01',
            'capacity' => 12,
            'location' => 'Bloco B, Sala 102',
            'resources' => 'TV 55", Mesa de Conferência, Ar-condicionado',
        ]);

        Room::create([
            'name' => 'Laboratório de Informática',
            'capacity' => 30,
            'location' => 'Bloco C, Piso 2',
            'resources' => '30 Computadores, Projetor, Quadro Branco',
        ]);
    }
}
