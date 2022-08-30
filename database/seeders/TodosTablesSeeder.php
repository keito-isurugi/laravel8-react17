<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TodosTablesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('todos')->insert(
            [
                [
                    'name' => '買い物',
                    'status' => '作業中'
                ],
                [
                    'name' => '料理',
                    'status' => '作業中'
                ],
                [
                    'name' => '洗濯',
                    'status' => '作業中'
                ],
            ]
            );
    }
}
