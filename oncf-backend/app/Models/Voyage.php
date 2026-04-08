<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voyage extends Model
{
    protected $fillable = [
        'code_voyage', 'heureDepart', 'villeDepart',
        'heureDarrivee', 'villeDarrivee', 'prixVoyage',
    ];

    public function commandes()
    {
        return $this->belongsToMany(
            Commande::class, 'billets', 'id_voyage', 'id_commande'
        )->withPivot('qte', 'nom_voyageur', 'passport_voyageur');
    }

    public function billets()
    {
        return $this->hasMany(Billet::class, 'id_voyage');
    }
}