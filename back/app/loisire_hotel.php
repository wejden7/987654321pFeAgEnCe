<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class loisire_hotel extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'hotel','loisire'
    ];
}
