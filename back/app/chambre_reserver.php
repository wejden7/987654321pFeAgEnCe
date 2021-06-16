<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class chambre_reserver extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'reservation', 'chambre','nb_enfant','nb_adulte','nb_bebe'
    ];
}
