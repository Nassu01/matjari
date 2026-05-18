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
        Schema::create('product_user', function (Blueprint $blueprint) {
            $blueprint->id();
            
            // ربط معرف المستخدم (تأكد من توافق اسم الجدول 'users' مع قاعدة بياناتك)
            $blueprint->foreignId('user_id')->constrained()->cascadeOnDelete();
            
            // ربط معرف المنتج (تأكد من توافق اسم الجدول 'products' مع قاعدة بياناتك)
            $blueprint->foreignId('product_id')->constrained()->cascadeOnDelete();
            
            $blueprint->timestamps();

            // منع تكرار نفس المنتج لنفس المستخدم في المفضلة
            $blueprint->unique(['user_id', 'product_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_user');
    }
};