<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            if (! Schema::hasColumn('products', 'external_source')) {
                $table->string('external_source')->nullable()->after('is_active');
            }

            if (! Schema::hasColumn('products', 'external_id')) {
                $table->string('external_id')->nullable()->after('external_source');
            }
        });

        Schema::table('products', function (Blueprint $table) {
            $table->unique(['external_source', 'external_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropUnique(['external_source', 'external_id']);
            $table->dropColumn(['external_source', 'external_id']);
        });
    }
};
