<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use App\Models\User;


class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        foreach(range(1,10) as $index) {
            DB::table('users')->insert([
                'username'=>fake()->userName(),
                'firstname'=>fake()->firstName(),
                'lastname'=>fake()->lastName(),
                'phoneNumber'=>fake()->phoneNumber(),
                'email'=>fake()->unique()->safeEmail(),
                'email_verified_at' => now(),
                'gender'=>fake()->randomElement(['male', 'female']),
                'password'=>bcrypt('password'),
                'remember_token' => Str::random(10)
            ]);

            User::find($index)->assignRole('admin');
        };

        foreach(range(11,40) as $index) {
            DB::table('users')->insert([
                'username'=>fake()->userName(),
                'firstname'=>fake()->firstName(),
                'lastname'=>fake()->lastName(),
                'phoneNumber'=>fake()->phoneNumber(),
                'email'=>fake()->unique()->safeEmail(),
                'email_verified_at' => now(),
                'gender'=>fake()->randomElement(['male', 'female']),
                'password'=>bcrypt('password'),
                'remember_token' => Str::random(10)
            ]);

            User::find($index)->assignRole('qlht');
        };


    }
}
