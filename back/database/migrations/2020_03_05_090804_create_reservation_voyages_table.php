<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationVoyagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservation_voyages', function (Blueprint $table) {
            $table->id();
            $table->Integer('user')->unsigned();
            $table->Integer('voyage')->unsigned();
            $table->Integer('tarif')->unsigned();
            $table->enum('etat', array('en attente','valider', 'annuler'));
            $table->timestamps();
            $table->foreign('user')->references('id')->on('users')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('voyage')->references('id')->on('voyages')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('tarif')->references('id')->on('tarif_voyages')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservation_voyages');
    }
}
