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
    Schema::create('billets', function (Blueprint $table) {
        $table->id();
        $table->foreignId('id_voyage')
              ->constrained('voyages')
              ->cascadeOnDelete();
        $table->foreignId('id_commande')
              ->constrained('commandes')
              ->cascadeOnDelete();
        $table->unsignedInteger('qte');
        $table->string('nom_voyageur');
        $table->string('passport_voyageur');
        $table->timestamps();
        $table->unique(['id_commande', 'id_voyage']);
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billets');
    }
};
