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
        'nom','visibility','tel' ,'ville','description', 'etoile','image',
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
    public function chambre(){
        return $this->hasMany('App\chambre','hotel');
    }
    public function question(){
        return $this->hasMany('App\question_hotel','hotel');
    }
    public function Description(){
        return $this->hasMany('App\description_hotel','hotel');
    }
    public function reservation(){
        return $this->hasMany('App\reservation_hotel','hotel');
    }
    public function AgeMax(){
        return $this->hasMany('App\ageMaxHotelPersonne','hotel');
    }
    public function ALaUne_Hotel(){
        return $this->hasMany('App\aLaUneHotel','hotel');
    }
    public function promotionHotel(){
        return $this->hasMany('App\promotionHotel','hotel');
    }

}
