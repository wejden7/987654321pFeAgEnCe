<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Voyage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'categorie', 'titre', 'nbjour','nbplace','image'
    ];
}
