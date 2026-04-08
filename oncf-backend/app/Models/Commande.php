<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    protected $fillable = [
        'id_client', 'date_comm', 'stripe_payment_id', 'statut',
    ];

    public function client()
    {
        return $this->belongsTo(User::class, 'id_client');
    }

    public function voyages()
    {
        return $this->belongsToMany(
            Voyage::class, 'billets', 'id_commande', 'id_voyage'
        )->withPivot('qte', 'nom_voyageur', 'passport_voyageur');
    }

    public function billets()
    {
        return $this->hasMany(Billet::class, 'id_commande');
    }
}