<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class interdi extends Model
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
