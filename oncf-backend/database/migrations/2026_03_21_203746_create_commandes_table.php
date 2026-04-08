<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up(): void
{
    Schema::create('commandes', function (Blueprint $table) {
        $table->id();
        $table->foreignId('id_client')
              ->constrained('users')
              ->cascadeOnDelete();
        $table->date('date_comm');
        $table->string('stripe_payment_id')->nullable();
        $table->enum('statut', ['en_attente', 'payee', 'annulee'])
              ->default('en_attente');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commandes');
    }
};
