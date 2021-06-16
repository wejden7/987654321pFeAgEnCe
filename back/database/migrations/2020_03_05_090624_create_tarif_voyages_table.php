<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTarifVoyagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tarif_voyages', function (Blueprint $table) {
            $table->increments('id');
            $table->Integer('voyage')->unsigned();
            $table->date('date');
            $table->float('prixAdulte',10,3);
            $table->float('prixEnfant',10,3);
            $table->timestamps();
            $table->foreign('voyage')->references('id')->on('voyages')
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
        Schema::dropIfExists('tarif_voyages');
    }
}
