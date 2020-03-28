<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePonsionHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ponsion_hotels', function (Blueprint $table) {
            $table->id();
            $table->Integer('hotel')->unsigned();
            $table->Integer('ponsion')->unsigned();
            $table->foreign('hotel')->references('id')->on('hotels')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('ponsion')->references('id')->on('pensions')
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
        Schema::dropIfExists('ponsion_hotels');
    }
}
