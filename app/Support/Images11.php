<?php

namespace App\Support;

class Images11
{
    private static ?array $images = null;

    public static function all(): array
    {
        if (self::$images !== null) {
            return self::$images;
        }

        $manifest = public_path('images/11/images.json');
        if (! is_file($manifest)) {
            return self::$images = [];
        }

        $payload = json_decode((string) file_get_contents($manifest), true);
        $images = is_array($payload['images'] ?? null) ? $payload['images'] : [];

        return self::$images = array_values(array_filter(
            $images,
            fn ($image) => is_array($image) && ! empty($image['url'])
        ));
    }

    public static function urlAt(int $index): string
    {
        $images = self::all();
        if ($images === []) {
            return '';
        }

        return (string) ($images[$index % count($images)]['url'] ?? '');
    }
}
