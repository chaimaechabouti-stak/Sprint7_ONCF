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
    Schema::create('voyages', function (Blueprint $table) {
        $table->id();
        $table->string('code_voyage')->unique();
        $table->time('heureDepart');
        $table->string('villeDepart');
        $table->time('heureDarrivee');
        $table->string('villeDarrivee');
        $table->double('prixVoyage', 8, 2);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voyages');
    }
};
