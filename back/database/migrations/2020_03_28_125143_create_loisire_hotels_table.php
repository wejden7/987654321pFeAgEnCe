<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLoisireHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('loisire_hotels', function (Blueprint $table) {
            $table->id();
            $table->Integer('hotel')->unsigned();
            $table->Integer('loisire')->unsigned();
            $table->foreign('hotel')->references('id')->on('hotels')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('loisire')->references('id')->on('loisires')
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
        Schema::dropIfExists('loisire_hotels');
    }
}
