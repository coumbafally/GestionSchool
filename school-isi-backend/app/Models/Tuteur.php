<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tuteur extends Model
{
    use HasFactory;
    
    protected $fillable = ['numero_tel', 'user_id', 'eleve_id', 'identifiant_tuteur'];

    public function user() {
        return $this->belongsTo(User::class);
    }
    public function eleve() {
        return $this->belongsTo(Eleve::class);
    }
}
