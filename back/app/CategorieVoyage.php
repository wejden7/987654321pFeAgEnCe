<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategorieVoyage extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'payer', 'image', 'type',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        
    ];
    public function voyage(){
        return $this->hasMany('App\Voyage','categorie');
    }
    public function visa(){
        return $this->hasMany('App\paysVisa','pays');
    }
}
