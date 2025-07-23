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
        Schema::create('notes', function (Blueprint $table) {
            $table->id();
             $table->foreignId('eleve_id')->constrained()->onDelete('cascade');
        $table->foreignId('matiere_id')->constrained()->onDelete('cascade');
        $table->foreignId('enseignant_id')->constrained()->onDelete('cascade');
        $table->decimal('note', 4, 2); // 4 chiffres au total, 2 après la virgule (ex: 12.50)
        $table->string('periode'); // ex: "Trimestre 1 2024"
        $table->text('appreciation')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notes');
    }
};
