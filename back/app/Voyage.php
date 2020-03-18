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
        'categorie', 'titre', 'nbjour','nbplace','image'
    ];
    public function payes(){

        return $this->belongsTo('App\CategorieVoyage','categorie');
    }
    
    public function periode(){
        return $this->hasMany('App\TarifVoyage','voyage');
    }
}
