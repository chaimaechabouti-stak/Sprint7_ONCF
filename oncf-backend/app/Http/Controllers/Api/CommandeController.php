<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Commande;
use App\Models\Billet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CommandeController extends Controller
{
    // POST /api/commandes
    public function store(Request $request)
    {
        $request->validate([
            'stripe_payment_id'         => 'required|string',
            'items'                     => 'required|array|min:1',
            'items.*.voyage_id'         => 'required|integer|exists:voyages,id',
            'items.*.qte'               => 'required|integer|min:1',
            'items.*.nom_voyageur'      => 'required|string',
            'items.*.passport_voyageur' => 'required|string',
        ]);

        DB::beginTransaction();
        try {
            $commande = Commande::create([
                'id_client'         => $request->user()->id,
                'date_comm'         => now()->toDateString(),
                'stripe_payment_id' => $request->stripe_payment_id,
                'statut'            => 'payee',
            ]);

            foreach ($request->items as $item) {
                Billet::create([
                    'id_commande'       => $commande->id,
                    'id_voyage'         => $item['voyage_id'],
                    'qte'               => $item['qte'],
                    'nom_voyageur'      => $item['nom_voyageur'],
                    'passport_voyageur' => $item['passport_voyageur'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message'     => 'Commande créée.',
                'commande_id' => $commande->id,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Erreur : ' . $e->getMessage(),
            ], 500);
        }
    }

    // GET /api/commandes/{id}/billets
    public function billets(Request $request, $id)
    {
        $commande = Commande::with(['billets.voyage', 'client'])
                            ->findOrFail($id);

        if ($commande->id_client !== $request->user()->id) {
            return response()->json(['message' => 'Accès refusé.'], 403);
        }

        return response()->json($commande);
    }

    // GET /api/mes-commandes
    public function mesCommandes(Request $request)
    {
        $commandes = Commande::with(['billets.voyage'])
            ->where('id_client', $request->user()->id)
            ->latest()
            ->get();

        return response()->json($commandes);
    }
}