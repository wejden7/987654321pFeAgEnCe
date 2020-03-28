<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservation_hotels', function (Blueprint $table) {
            $table->increments('id');
            $table->Integer('user')->unsigned();
            $table->Integer('pension')->unsigned();
            $table->Integer('hotel')->unsigned();
            $table->date('date_in');
            $table->date('date_out');
            $table->enum('etat', array('en attente','valider', 'annuler'));
            $table->float('prix',15,3);
            $table->foreign('user')->references('id')->on('users')
                  ->onDelete('cascade')
                   ->onUpdate('cascade');
            $table->foreign('hotel')->references('id')->on('hotels')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->foreign('pension')->references('id')->on('pensions')
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
        Schema::dropIfExists('reservation_hotels');
    }
}
