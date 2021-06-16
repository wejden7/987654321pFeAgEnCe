<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id_de','user_id_a','objet','message','vu'
    ];
}
