<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class serviceNonInclus extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'voyage', 'service'
   ];
}
