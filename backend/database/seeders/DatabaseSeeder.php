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
            'password' => Hash::make(value: 'senha123'),
            'role' => 'admin',
        ]);
    }
}
