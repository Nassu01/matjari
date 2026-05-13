<?php

use App\Models\SiteSetting;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->string('hero_badge')->nullable()->after('navbar_links');
            $table->string('hero_title')->nullable()->after('hero_badge');
            $table->string('hero_title_accent')->nullable()->after('hero_title');
            $table->text('hero_description')->nullable()->after('hero_title_accent');
            $table->string('hero_primary_button_label')->nullable()->after('hero_description');
            $table->string('hero_primary_button_url')->nullable()->after('hero_primary_button_label');
            $table->string('hero_secondary_button_label')->nullable()->after('hero_primary_button_url');
            $table->string('hero_secondary_button_url')->nullable()->after('hero_secondary_button_label');
            $table->string('hero_stat_one_value')->nullable()->after('hero_secondary_button_url');
            $table->string('hero_stat_one_label')->nullable()->after('hero_stat_one_value');
            $table->string('hero_stat_two_value')->nullable()->after('hero_stat_one_label');
            $table->string('hero_stat_two_label')->nullable()->after('hero_stat_two_value');
            $table->string('hero_image_path')->nullable()->after('hero_stat_two_label');
            $table->string('promo_badge')->nullable()->after('hero_image_path');
            $table->string('promo_title')->nullable()->after('promo_badge');
            $table->text('promo_description')->nullable()->after('promo_title');
            $table->string('promo_button_label')->nullable()->after('promo_description');
            $table->string('promo_button_url')->nullable()->after('promo_button_label');
        });

        SiteSetting::query()->firstOrCreate([], SiteSetting::defaults());
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn([
                'hero_badge',
                'hero_title',
                'hero_title_accent',
                'hero_description',
                'hero_primary_button_label',
                'hero_primary_button_url',
                'hero_secondary_button_label',
                'hero_secondary_button_url',
                'hero_stat_one_value',
                'hero_stat_one_label',
                'hero_stat_two_value',
                'hero_stat_two_label',
                'hero_image_path',
                'promo_badge',
                'promo_title',
                'promo_description',
                'promo_button_label',
                'promo_button_url',
            ]);
        });
    }
};
