<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class reservation_hotel extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user', 'pension', 'hotel','date_in','date_out','etat','prix'
    ];
    public function chambre_reserver(){
        return $this->hasMany('App\chambre_reserver','reservation');
    }
}
