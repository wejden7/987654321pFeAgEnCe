<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ageMaxHotelPersonne extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'hotel', 'type','age'
    ];
}
