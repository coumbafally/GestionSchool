<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('notes', function (Blueprint $table) {

            if (Schema::hasColumn('notes', 'matiere_id')) {
                $table->dropForeign(['matiere_id']);
                $table->dropColumn('matiere_id');
            }

            if (!Schema::hasColumn('notes', 'mce_id')) {
                $table->foreignId('mce_id')->nullable()->after('eleve_id')->constrained('matiere_classe_enseignant')->onDelete('cascade');
            }

            if (!Schema::hasColumn('notes', 'coefficient')) {
                $table->float('coefficient')->default(1)->after('note');
            }
        });
    }

    public function down(): void
    {
        Schema::table('notes', function (Blueprint $table) {
            if (Schema::hasColumn('notes', 'mce_id')) {
                $table->dropForeign(['mce_id']);
                $table->dropColumn('mce_id');
            }

            if (Schema::hasColumn('notes', 'coefficient')) {
                $table->dropColumn('coefficient');
            }

            if (!Schema::hasColumn('notes', 'matiere_id')) {
                $table->foreignId('matiere_id')->nullable()->constrained('matieres')->onDelete('cascade');
            }
        });
    }
};