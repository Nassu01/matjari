<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('company_name');
            $table->string('company_type');
            $table->string('ice')->nullable();
            $table->string('patente')->nullable();
            $table->text('company_address')->nullable();
            $table->string('city')->nullable();
            $table->string('company_phone')->nullable();
            $table->string('main_category')->nullable();
            $table->string('company_logo')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('companies');
    }
};
