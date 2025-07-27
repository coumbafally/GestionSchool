<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bulletin extends Model
{
    use HasFactory;
    protected $fillable = ['eleve_id', 'periode', 'moyenne_generale', 'mention', 'rang', 'appreciation', 'pdf_url'];

    public function eleve() {
        return $this->belongsTo(Eleve::class);
    }
}
