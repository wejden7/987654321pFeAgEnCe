<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class loisire extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'icon','titre'
    ];
}
