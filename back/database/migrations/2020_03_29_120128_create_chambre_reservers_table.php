<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChambreReserversTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chambre_reservers', function (Blueprint $table) {
            $table->id();
            $table->Integer('reservation')->unsigned();
            $table->Integer('chambre')->unsigned();
            $table->Integer('nb_enfant');
            $table->Integer('nb_adulte');
            $table->Integer('nb_bebe');
            $table->foreign('chambre')->references('id')->on('chambres')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->foreign('reservation')->references('id')->on('reservation_hotels')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chambre_reservers');
    }
}
