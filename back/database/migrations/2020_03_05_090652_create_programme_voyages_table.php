<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProgrammeVoyagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('programme_voyages', function (Blueprint $table) {
            $table->id();
            $table->Integer('voyage')->unsigned();
            $table->Integer('jour');
            $table->text('description');
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
        Schema::dropIfExists('programme_voyages');
    }
}
