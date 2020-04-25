<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTarifChombresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tarif_chombres', function (Blueprint $table) {
            $table->id();
            $table->Integer('chambre')->unsigned();
            $table->Integer('hotel')->unsigned();
            $table->Integer('mois')->unsigned();
            $table->float('prixAdulte',10,3);
            $table->float('prixEnfant',10,3);
            $table->float('prixBebe',10,3);
            $table->timestamps();
            $table->foreign('chambre')->references('id')->on('chambres')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('hotel')->references('id')->on('hotels')
                ->onDelete('cascade')
                ->onUpdate('cascade');
            $table->foreign('mois')->references('id')->on('mois')
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
        Schema::dropIfExists('tarif_chombres');
    }
}
