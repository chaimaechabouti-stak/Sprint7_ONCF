<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Billet extends Model
{
    protected $fillable = [
        'id_voyage', 'id_commande', 'qte',
        'nom_voyageur', 'passport_voyageur',
    ];

    public function voyage()
    {
        return $this->belongsTo(Voyage::class, 'id_voyage');
    }

    public function commande()
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }
}