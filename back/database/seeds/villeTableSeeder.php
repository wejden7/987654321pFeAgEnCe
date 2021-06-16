<?php

use Illuminate\Database\Seeder;

class villeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('villes')->insert([
            'nom' => 'Tunis',
        ]);
        DB::table('villes')->insert([
            'nom' => 'Sousse',
        ]);
        DB::table('villes')->insert([
            'nom' => 'Monastir',
        ]);
        DB::table('villes')->insert([
            'nom' => 'Hammamet',
        ]);
        DB::table('villes')->insert([
            'nom' => 'Djerba ',
        ]);
        DB::table('villes')->insert([
            'nom' => 'Mahdia',
        ]);
        DB::table('villes')->insert([
            'nom' => 'Tozeur',
        ]);
        DB::table('villes')->insert([
            'nom' => 'Tabarka',
        ]);
        DB::table('villes')->insert([
            'nom' => 'Bizerte',
        ]);
    }
}
