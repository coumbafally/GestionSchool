<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('bulletins', function (Blueprint $table) {
            $table->index(['eleve_id', 'periode']); 
        });
    }

    public function down(): void
    {
        Schema::table('bulletins', function (Blueprint $table) {
            $table->dropIndex(['eleve_id', 'periode']);
        });
    }
};