<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VoyageController;
use App\Http\Controllers\Api\CommandeController;
use App\Http\Controllers\Api\StripeController;

// ── Routes publiques ──────────────────────────────────────────
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login',    [AuthController::class, 'login']);

Route::get('/voyages/villes',    [VoyageController::class, 'getVilles']);
Route::get('/voyages/recherche', [VoyageController::class, 'recherche']);

// ── Routes protégées (token Sanctum requis) ───────────────────
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user',    [AuthController::class, 'me']);

    Route::post('/stripe/create-intent',  [StripeController::class,  'createIntent']);

    Route::post('/commandes',             [CommandeController::class, 'store']);
    Route::get('/commandes/{id}/billets', [CommandeController::class, 'billets']);
    Route::get('/mes-commandes',          [CommandeController::class, 'mesCommandes']);
});