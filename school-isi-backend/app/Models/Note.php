<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'appreciation',
    ];

    public function eleve()
    {
        return $this->belongsTo(Eleve::class);
    }

    public function mce()
    {
        return $this->belongsTo(MatiereClasseEnseignant::class, 'mce_id');
    }

    public function matiere()
    {
        return $this->mce?->matiere;
    }

    public function enseignant()
    {
        return $this->mce?->enseignant;
    }

    public function classe()
    {
        return $this->mce?->classe;
    }
}
