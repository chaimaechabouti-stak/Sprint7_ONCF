<?php
namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'login'    => 'client1',
            'password' => Hash::make('123456'),
            'nom'      => 'Alaoui',
            'prenom'   => 'Mohamed',
            'email'    => 'client1@mail.com',
            'tel'      => '0600000001',
            'role'     => 'USER',
        ]);
    }
}