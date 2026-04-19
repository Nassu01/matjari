<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $brands = [
            [
                'name' => 'Matjari Essentials',
                'slug' => 'matjari-essentials',
                'description' => 'Core daily products selected for the Matjari storefront.',
                'is_active' => true,
            ],
            [
                'name' => 'Urban Style',
                'slug' => 'urban-style',
                'description' => 'Modern accessories and clothing.',
                'is_active' => true,
            ],
            [
                'name' => 'Tech Wave',
                'slug' => 'tech-wave',
                'description' => 'Electronics and gadgets for everyday use.',
                'is_active' => true,
            ],
        ];

        foreach ($brands as $brand) {
            Brand::updateOrCreate(
                ['slug' => $brand['slug']],
                $brand,
            );
        }
    }
}
