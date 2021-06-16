<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgeMaxHotelPersonnesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('age_max_hotel_personnes', function (Blueprint $table) {
            $table->id();
            $table->Integer('hotel')->unsigned();
            $table->enum('type', array('bebe', 'enfant'));
            $table->Integer('age');
            $table->foreign('hotel')->references('id')->on('hotels')
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
        Schema::dropIfExists('age_max_hotel_personnes');
    }
}
