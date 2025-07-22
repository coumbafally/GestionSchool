<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function eleve()
    {
        return $this->belongsTo(Eleve::class);
    }
}
