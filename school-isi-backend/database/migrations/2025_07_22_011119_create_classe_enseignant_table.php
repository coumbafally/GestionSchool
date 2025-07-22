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
        Schema::create('classe_enseignant', function (Blueprint $table) {
         
            $table->primary(['classe_id', 'enseignant_id']); // Clé primaire composite
            $table->foreignId('classe_id')->constrained()->onDelete('cascade');
            $table->foreignId('enseignant_id')->constrained()->onDelete('cascade');
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('classe_enseignant');
    }
};
