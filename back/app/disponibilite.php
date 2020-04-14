<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class disponibilite extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'chambre', 'date','nb'
    ];
    protected $primaryKey="chambre";
}
