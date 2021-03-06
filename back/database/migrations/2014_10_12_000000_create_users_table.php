<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('surname');
            $table->string('tel');
            $table->string('code')->nullable();
            $table->string('email')->unique();
            $table->boolean('bloquer')->default(false);
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->enum('role', array('user', 'admin','visiteurs'));
            $table->enum('civilite', array('', 'Mr','Mme'));
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
