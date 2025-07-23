<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enseignant extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    // Relation Plusieurs-à-Plusieurs : Un prof enseigne dans plusieurs classes
    public function classes()
    {
        return $this->belongsToMany(Classe::class, 'classe_enseignant');
    }

    // Relation Plusieurs-à-Plusieurs : Un prof enseigne plusieurs matières
    public function matieres()
    {
        return $this->belongsToMany(Matiere::class, 'enseignant_matiere');
    }
}
