<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionHotelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('question_hotels', function (Blueprint $table) {
            $table->id();
            $table->string('question')->unique();
            $table->Integer('hotel')->unsigned();
            $table->text('reponce');
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
        Schema::dropIfExists('question_hotels');
    }
}
