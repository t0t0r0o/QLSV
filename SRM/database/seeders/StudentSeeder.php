<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach(range(1,30) as $index) {
            DB::table('students')->insert([
                'username'=>fake()->userName(),
                'firstname'=>fake()->firstName(),
                'lastname'=>fake()->lastName(),
                'phoneNumber'=>fake()->phoneNumber(),
                'email'=>fake()->unique()->safeEmail(),
                'email_verified_at' => now(),
                'gender'=>fake()->randomElement(['male', 'female']),
                'identification' => Str::random(10),
                'address' => fake()->address(),
                'school-id'=>Str::random(3),
            ]);
        };
    }
}
