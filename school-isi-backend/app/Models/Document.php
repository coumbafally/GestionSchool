<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
     use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'eleve_id',
        'type_document',
        'chemin_fichier',
    ];

    /**
     * Obtenir l'élève auquel ce document appartient.
     */
    public function eleve()
    {
        return $this->belongsTo(Eleve::class);
    }
}
