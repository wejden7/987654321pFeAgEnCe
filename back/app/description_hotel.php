<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class description_hotel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'titre', 'hotel','description'
    ];
}
