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
            $table->json('banner_slides')->nullable()->after('hero_image_path');
        });

        $settings = SiteSetting::current();

        if (empty($settings->banner_slides)) {
            $settings->forceFill([
                'banner_slides' => SiteSetting::defaults()['banner_slides'],
            ])->save();
        }
    }

    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            $table->dropColumn('banner_slides');
        });
    }
};
