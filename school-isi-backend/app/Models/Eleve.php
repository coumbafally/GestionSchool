<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Eleve extends Model

{

    use HasFactory;
     protected $guarded = [];

     public function user()
    {
        return $this->belongsTo(User::class);
    }

        // Relation : Un élève appartient à une classe
    public function classe()
    {
        return $this->belongsTo(Classe::class);
    }

    // Relation : Un élève a plusieurs notes
    public function notes()
    {
        return $this->hasMany(Note::class);
    }

    // Relation : Un élève a plusieurs documents
    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}
