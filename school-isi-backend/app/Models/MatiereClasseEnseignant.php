<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatiereClasseEnseignant extends Model
{
     use HasFactory;
    protected $table = 'matiere_classe_enseignant';
    protected $fillable = ['classe_id', 'matiere_id', 'enseignant_id'];

    public function classe() { return $this->belongsTo(Classe::class); }
    public function matiere() { return $this->belongsTo(Matiere::class); }
    public function enseignant() { return $this->belongsTo(Enseignant::class); }
}
