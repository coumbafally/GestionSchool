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
        Schema::create('bulletins', function (Blueprint $table) {
            $table->id();
             $table->foreignId('eleve_id')->constrained('eleves')->onDelete('cascade');
            $table->string('periode', 50);
            $table->float('moyenne_generale');
            $table->string('mention', 100)->nullable();
            $table->integer('rang')->nullable();
            $table->text('appreciation')->nullable();
            $table->string('pdf_url', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bulletins');
    }
};
