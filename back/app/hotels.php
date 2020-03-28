<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class hotels extends Model
{
   /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nom', 'ville','description', 'etoile','image',
    ];
}
