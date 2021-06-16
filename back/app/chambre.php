<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class chambre extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'type', 'hotel','nb'
    ];
    public function tarif(){
        return $this->hasMany('App\Tarif_chombres','chambre');
    }
    public function disponibilite(){
        return $this->hasMany('App\disponibilite','chambre');
    }
}
