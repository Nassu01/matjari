<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Bags',
                'slug' => 'bags',
                'description' => 'Backpacks, handbags, and everyday carry products.',
                'is_active' => true,
            ],
            [
                'name' => 'Shoes',
                'slug' => 'shoes',
                'description' => 'Comfortable and stylish shoes for all seasons.',
                'is_active' => true,
            ],
            [
                'name' => 'Accessories',
                'slug' => 'accessories',
                'description' => 'Watches, caps, and finishing touches.',
                'is_active' => true,
            ],
            [
                'name' => 'Electronics',
                'slug' => 'electronics',
                'description' => 'Audio and personal tech products.',
                'is_active' => true,
            ],
            [
                'name' => 'Clothing',
                'slug' => 'clothing',
                'description' => 'Everyday fashion and wardrobe essentials.',
                'is_active' => true,
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category,
            );
        }
    }
}
