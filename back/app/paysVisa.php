<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class paysVisa extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'pays','titre'
    ];
}
