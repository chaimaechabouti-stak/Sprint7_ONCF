<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Voyage;
use Illuminate\Http\Request;

class VoyageController extends Controller
{
    // GET /api/voyages/villes
    public function getVilles()
    {
        $depart  = Voyage::distinct()->orderBy('villeDepart')->pluck('villeDepart');
        $arrivee = Voyage::distinct()->orderBy('villeDarrivee')->pluck('villeDarrivee');
        $toutes  = $depart->merge($arrivee)->unique()->sort()->values();

        return response()->json([
            'depart'  => $depart,
            'arrivee' => $arrivee,
            'toutes'  => $toutes,
        ]);
    }

    // GET /api/voyages/recherche?ville_depart=Rabat&ville_arrivee=Casablanca
    public function recherche(Request $request)
    {
        $request->validate([
            'ville_depart'  => 'required|string',
            'ville_arrivee' => 'required|string',
        ]);

        $voyages = Voyage::where('villeDepart',   $request->ville_depart)
                         ->where('villeDarrivee', $request->ville_arrivee)
                         ->get();

        return response()->json([
            'voyages'       => $voyages,
            'ville_depart'  => $request->ville_depart,
            'ville_arrivee' => $request->ville_arrivee,
            'count'         => $voyages->count(),
        ]);
    }
}