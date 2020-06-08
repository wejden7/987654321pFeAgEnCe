<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name','surname' ,'civilite','tel','email','bloquer','password','code'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token','code'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
    public function reservation(){
        return $this->hasMany('App\ReservationVoyage','user');
    }
    public function reservation_hotel(){
        return $this->hasMany('App\reservation_hotel','user');
    }
    public function MessageEnvoyer(){
        return $this->hasMany('App\Message','user_id_de');
    }
    public function MessageRemis(){
        return $this->hasMany('App\Message','user_id_a');
    }
}
