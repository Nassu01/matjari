<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            [
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Full administration access across the platform.',
                'is_active' => true,
            ],
            [
                'name' => 'Commercant',
                'slug' => 'commercant',
                'description' => 'Merchant access limited to owned products and orders.',
                'is_active' => true,
            ],
            [
                'name' => 'Livreur',
                'slug' => 'livreur',
                'description' => 'Delivery access focused on shipment and order handling.',
                'is_active' => true,
            ],
            [
                'name' => 'Customer',
                'slug' => 'customer',
                'description' => 'Default storefront customer role.',
                'is_active' => true,
            ],
        ];

        foreach ($roles as $role) {
            Role::updateOrCreate(
                ['slug' => $role['slug']],
                $role,
            );
        }
    }
}
