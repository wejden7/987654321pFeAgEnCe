<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class hotels extends Model
{
   /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nom', 'ville','description', 'etoile','image',
    ];
    public function ponsion_hotel(){
        return $this->hasMany('App\ponsion_hotel','hotel');
    }
    public function loisire_hotel(){
        return $this->hasMany('App\loisire_hotel','hotel');
    }
    public function interdi_hotel(){
        return $this->hasMany('App\interdi_hotel','hotel');
    }
    public function photos_hotel(){
        return $this->hasMany('App\photos_hotel','hotel');
    }
    

}
