<?php

use Illuminate\Database\Seeder;

class MoisTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mois')->insert([
            'nom' => 'janvier',
        ]);
         DB::table('mois')->insert([
            'nom' => 'fevrier',
        ]);
         DB::table('mois')->insert([
            'nom' => 'mars',
        ]); 
        DB::table('mois')->insert([
            'nom' => 'avril',
        ]);
         DB::table('mois')->insert([
            'nom' => 'mai',
        ]);
         DB::table('mois')->insert([
            'nom' => 'juin',
        ]);
         DB::table('mois')->insert([
            'nom' => 'juillet',
        ]); 
        DB::table('mois')->insert([
            'nom' => 'aout',
        ]); 
        DB::table('mois')->insert([
            'nom' => 'septembre',
        ]);
         DB::table('mois')->insert([
            'nom' => 'octobre',
        ]);
         DB::table('mois')->insert([
            'nom' => 'novembre',
        ]); 
        DB::table('mois')->insert([
            'nom' => 'decembre',
        ]);
    }
}
