<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PhotosVoyage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'voyage', 'name', 
    ];
}
