<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            if (! Schema::hasColumn('orders', 'payment_method')) {
                $table->string('payment_method')->default('cash_on_delivery')->after('status');
            }

            if (! Schema::hasColumn('orders', 'subtotal')) {
                $table->decimal('subtotal', 10, 2)->default(0)->after('payment_status');
            }

            if (! Schema::hasColumn('orders', 'shipping_total')) {
                $table->decimal('shipping_total', 10, 2)->default(0)->after('subtotal');
            }

            if (! Schema::hasColumn('orders', 'delivery_address')) {
                $table->text('delivery_address')->nullable()->after('customer_phone');
            }

            if (! Schema::hasColumn('orders', 'city')) {
                $table->string('city')->nullable()->after('delivery_address');
            }

            if (! Schema::hasColumn('orders', 'invoice_path')) {
                $table->string('invoice_path')->nullable()->after('shipped_at');
            }

            if (! Schema::hasColumn('orders', 'invoice_number')) {
                $table->string('invoice_number')->nullable()->unique()->after('invoice_path');
            }
        });

        Schema::table('order_items', function (Blueprint $table) {
            if (! Schema::hasColumn('order_items', 'merchant_id')) {
                $table->foreignId('merchant_id')->nullable()->after('product_id')->constrained('users')->nullOnDelete();
            }

            if (! Schema::hasColumn('order_items', 'product_sku')) {
                $table->string('product_sku')->nullable()->after('product_name');
            }

            if (! Schema::hasColumn('order_items', 'total')) {
                $table->decimal('total', 10, 2)->default(0)->after('total_price');
            }
        });
    }

    public function down(): void
    {
        Schema::table('order_items', function (Blueprint $table) {
            if (Schema::hasColumn('order_items', 'merchant_id')) {
                $table->dropConstrainedForeignId('merchant_id');
            }

            foreach (['product_sku', 'total'] as $column) {
                if (Schema::hasColumn('order_items', $column)) {
                    $table->dropColumn($column);
                }
            }
        });

        Schema::table('orders', function (Blueprint $table) {
            foreach (['payment_method', 'subtotal', 'shipping_total', 'delivery_address', 'city', 'invoice_path', 'invoice_number'] as $column) {
                if (Schema::hasColumn('orders', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};
