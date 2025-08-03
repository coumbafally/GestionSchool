<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Eleve extends Model
{
<<<<<<< HEAD
     use HasFactory;
    protected $fillable = ['user_id', 'classe_id', 'date_naissance', 'lieu_naissance', 'adresse', 'identifiant_eleve'];
=======
    use HasFactory;
    protected $fillable = [
        'user_id',
        'classe_id',
        'date_naissance',
        'lieu_naissance',
        'adresse',
        'identifiant_eleve'
    ];
>>>>>>> origin/magou

    public function user() {
        return $this->belongsTo(User::class);
    }
    public function classe() {
        return $this->belongsTo(Classe::class);
    }
    public function tuteur() {
        return $this->hasOne(Tuteur::class);
    }
    public function documents() {
        return $this->hasMany(Document::class);
<<<<<<< HEAD
    }
=======
        
    }
    
>>>>>>> origin/magou
    public function notes() {
        return $this->hasMany(Note::class);
    }
    public function bulletins() {
        return $this->hasMany(Bulletin::class);
    }
}
