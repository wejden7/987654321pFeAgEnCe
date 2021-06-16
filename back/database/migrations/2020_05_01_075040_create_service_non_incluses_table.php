<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateServiceNonInclusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('service_non_incluses', function (Blueprint $table) {
            $table->id();
            $table->Integer('voyage')->unsigned();
            $table->string('service');
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
        Schema::dropIfExists('service_non_incluses');
    }
}
