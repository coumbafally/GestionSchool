<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
     use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'type',
        'contenu',
        'lu',
    ];

    /**
    * The attributes that should be cast.
    *
    * @var array
    */
    protected $casts = [
        'lu' => 'boolean', // S'assure que le champ 'lu' est toujours un booléen
    ];

    /**
     * Obtenir l'utilisateur auquel cette notification est destinée.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
