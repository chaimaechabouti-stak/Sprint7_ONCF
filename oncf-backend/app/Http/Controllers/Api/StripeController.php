<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Stripe\Exception\ApiErrorException;

class StripeController extends Controller
{
    // POST /api/stripe/create-intent
    public function createIntent(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $intent = PaymentIntent::create([
                'amount'   => (int) ($request->amount * 100),
                'currency' => 'mad',
                'automatic_payment_methods' => ['enabled' => true],
                'metadata' => [
                    'user_id' => $request->user()->id,
                ],
            ]);

            return response()->json([
                'clientSecret' => $intent->client_secret,
                'intentId'     => $intent->id,
            ]);

        } catch (ApiErrorException $e) {
            return response()->json([
                'message' => 'Erreur Stripe : ' . $e->getMessage(),
            ], 500);
        }
    }
}