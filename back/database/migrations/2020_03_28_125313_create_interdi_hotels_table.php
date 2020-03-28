<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInterdiHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interdi_hotels', function (Blueprint $table) {
            $table->id();
            $table->Integer('hotel')->unsigned();
            $table->Integer('interdi')->unsigned();
            $table->foreign('hotel')->references('id')->on('hotels')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('interdi')->references('id')->on('interdis')
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
        Schema::dropIfExists('interdi_hotels');
    }
}
