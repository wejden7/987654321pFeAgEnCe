<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class type_chambre extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nom','nb'
    ];
}
