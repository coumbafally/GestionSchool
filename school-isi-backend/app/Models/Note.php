<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    use HasFactory;

    protected $fillable = [
        'eleve_id',
        'mce_id',
        'type',
        'periode',
        'note',
        'coefficient',
        'appreciation'
    ];

    protected $casts = [
        'note' => 'decimal:2',
        'coefficient' => 'decimal:2',
    ];

    public function eleve()
    {
        return $this->belongsTo(Eleve::class);
    }

    public function matiereClasseEnseignant()
    {
        return $this->belongsTo(MatiereClasseEnseignant::class, 'mce_id');
    }

    // Correction: relation via matiereClasseEnseignant
    public function matiere()
    {
        return $this->hasOneThrough(
            Matiere::class,
            MatiereClasseEnseignant::class,
            'id',
            'id',
            'mce_id',
            'matiere_id'
        );
    }

    public function enseignant()
    {
        return $this->hasOneThrough(
            Enseignant::class,
            MatiereClasseEnseignant::class,
            'id',
            'id',
            'mce_id',
            'enseignant_id'
        );
    }

    public function classe()
    {
        return $this->hasOneThrough(
            Classe::class,
            MatiereClasseEnseignant::class,
            'id',
            'id',
            'mce_id',
            'classe_id'
        );
    }
}