<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Voyage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'categorie', 'titre', 'nbjour','visibility','image'
    ];
    public function payes(){

        return $this->belongsTo('App\CategorieVoyage','categorie');
    }
    
    public function periode(){
        return $this->hasMany('App\TarifVoyage','voyage');
    }
    public function programme(){
        return $this->hasMany('App\ProgrammeVoyage','voyage');
    }
    public function images(){
        return $this->hasMany('App\PhotosVoyage','voyage');
    }
    public function rservationofonevoyage(){
        return $this->hasMany('App\ReservationVoyage','voyage');
    }
    public function Ala_uneVoyageNormale(){
        return $this->hasMany('App\aLaUneVoyagenormal','voyage');
    }
    public function Ala_uneVoyageOmra(){
        return $this->hasMany('App\aLaUneVoyageomra','voyage');
    }
}
