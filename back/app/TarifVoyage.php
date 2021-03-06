<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TarifVoyage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'voyage', 'date', 'prixAdulte','prixEnfant'
    ];
    public function rservationofonevoyage(){
        return $this->hasMany('App\ReservationVoyage','tarif');
    }
}
