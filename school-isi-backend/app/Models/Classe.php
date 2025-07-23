<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classe extends Model
{
    use HasFactory;
    protected $guarded = [];

     protected $fillable = ['nom', 'niveau'];


    public function eleves()
    {
        return $this->hasMany(Eleve::class);
    }

    public function enseignants()
    {
        return $this->belongsToMany(Enseignant::class, 'classe_enseignant');
    }
}
