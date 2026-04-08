<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'login', 'password', 'nom', 'prenom', 'email', 'tel', 'role',
    ];

    protected $hidden = ['password', 'remember_token'];

    public function commandes()
    {
        return $this->hasMany(Commande::class, 'id_client');
    }
}