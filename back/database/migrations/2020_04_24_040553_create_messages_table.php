<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id_de')->unsigned();
            $table->integer('user_id_a')->unsigned();
            $table->string('objet');
            $table->text('message');
            $table->timestamps();
            $table->foreign('user_id_de')->references('id')->on('users')
                    ->onDelete('cascade')
                    ->onUpdate('cascade');
             $table->foreign('user_id_a')->references('id')->on('users')
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
        Schema::dropIfExists('messages');
    }
}
