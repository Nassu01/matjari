<?php

use App\Models\SiteSetting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('site_name')->default('Matjari');
            $table->string('navbar_logo_path')->nullable();
            $table->string('navbar_home_label')->default('HOME');
            $table->string('navbar_category_label')->default('CATEGORY');
            $table->string('navbar_search_placeholder')->default('Search products...');
            $table->json('navbar_links')->nullable();
            $table->text('footer_description')->nullable();
            $table->json('footer_quick_links')->nullable();
            $table->json('footer_social_links')->nullable();
            $table->string('newsletter_title')->default('Newsletter');
            $table->text('newsletter_text')->nullable();
            $table->string('newsletter_placeholder')->default('Enter your email');
            $table->string('newsletter_button_label')->default('Subscribe');
            $table->string('footer_copyright')->nullable();
            $table->string('footer_policy_label')->default('Privacy Policy');
            $table->string('footer_terms_label')->default('Terms & Conditions');
            $table->timestamps();
        });

        SiteSetting::query()->create(SiteSetting::defaults());
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
