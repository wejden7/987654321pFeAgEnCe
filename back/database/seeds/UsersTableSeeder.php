<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'wejden',
            'surname'=>'chneti',
            'tel'=>'55568136',
            'role'=>'admin',
            'civilite'=>'Mr',
            'email' => 'wejdenchneti7@gmail.com',
            'password' => bcrypt('123456789'),
        ]);
        DB::table('users')->insert([
            'name' => 'ala',
            'surname'=>'ksaier',
            'tel'=>'55553359',
            'role'=>'user',
            'civilite'=>'Mr',
            'email' => 'ala@gmail.com',
            'password' => bcrypt('123456789'),
        ]);
    }
}
