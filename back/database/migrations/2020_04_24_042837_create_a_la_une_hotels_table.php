<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateALaUneHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('a_la_une_hotels', function (Blueprint $table) {
            $table->id();
            $table->Integer('hotel')->unsigned();
            $table->timestamps();
            $table->foreign('hotel')->references('id')->on('hotels')
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
        Schema::dropIfExists('a_la_une_hotels');
    }
}
