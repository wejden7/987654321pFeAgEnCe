<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePromotionHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promotion_hotels', function (Blueprint $table) {
            $table->id();
            $table->Integer('hotel')->unsigned();
            $table->Integer('adulteMin');
            $table->Integer('enfantMin');
            $table->Integer('ageEnfantMax');
            $table->Integer('bebeMin');
            $table->Integer('ageBebeMax');
            $table->Integer('nbJour');
            $table->enum('type', array('bebe', 'enfant','sejour'));
            $table->date('dateFin');
            $table->Integer('pourcentage');
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
        Schema::dropIfExists('promotion_hotels');
    }
}
