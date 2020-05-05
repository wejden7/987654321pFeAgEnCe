<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class promotionHotel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'hotel', 'titre','adulteMin', 'enfantMin','ageEnfantMax','bebeMin','ageBebeMax','type','dateFin','pourcentage','nbnuit'
    ];
}
