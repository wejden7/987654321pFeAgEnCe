<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tarif_chombres extends Model
{
      /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'chambre','hotel','mois','prixAdulte','prixEnfant','prixBebe'
    ];
}
