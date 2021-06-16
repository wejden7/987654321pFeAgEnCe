<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateALaUneVoyageomrasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('a_la_une_voyageomras', function (Blueprint $table) {
            $table->id();
            $table->Integer('voyage')->unsigned();
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
        Schema::dropIfExists('a_la_une_voyageomras');
    }
}
