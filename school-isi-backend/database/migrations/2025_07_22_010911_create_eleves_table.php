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
        Schema::create('eleves', function (Blueprint $table) {
            $table->id();
             $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('classe_id')->nullable()->constrained()->onDelete('set null');
        $table->string('prenom');
        $table->string('nom');
        $table->date('date_de_naissance');
        $table->text('adresse')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eleves');
    }
};
