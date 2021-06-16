<?php

use Illuminate\Database\Seeder;

class voyageomra extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categorie_voyages')->insert([
            'payer' => 'Arabie saoudite',
            'image'=>'',
            'type'=>'omra'
        ]);
    }
}
