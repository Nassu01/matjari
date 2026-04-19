<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role')->default('customer')->after('email');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('merchant_id')
                ->nullable()
                ->after('category_id')
                ->constrained('users')
                ->nullOnDelete();
        });

        Schema::table('orders', function (Blueprint $table) {
            $table->foreignId('merchant_id')
                ->nullable()
                ->after('user_id')
                ->constrained('users')
                ->nullOnDelete();
        });

        DB::table('users')
            ->where('email', 'admin@gmail.com')
            ->update(['role' => 'admin']);

        $adminId = DB::table('users')
            ->where('email', 'admin@gmail.com')
            ->value('id');

        if ($adminId) {
            DB::table('products')
                ->whereNull('merchant_id')
                ->update(['merchant_id' => $adminId]);

            DB::table('orders')
                ->whereNull('merchant_id')
                ->update(['merchant_id' => $adminId]);
        }
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropConstrainedForeignId('merchant_id');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->dropConstrainedForeignId('merchant_id');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('role');
        });
    }
};
