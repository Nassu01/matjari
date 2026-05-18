<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Support\Images11;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        $articles = BlogPost::query()
            ->published()
            ->latest('published_at')
            ->latest()
            ->get()
            ->map(fn (BlogPost $post) => $this->payload($post))
            ->values();

        return Inertia::render('Blog/Index', [
            'articles' => $articles,
        ]);
    }

    public function show(string $slug): Response
    {
        $post = BlogPost::query()
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();

        $post->increment('views_count');

        $relatedArticles = BlogPost::query()
            ->published()
            ->whereKeyNot($post->id)
            ->where('category', $post->category)
            ->latest('published_at')
            ->limit(3)
            ->get();

        if ($relatedArticles->count() < 3) {
            $extraArticles = BlogPost::query()
                ->published()
                ->whereKeyNot($post->id)
                ->whereNotIn('id', $relatedArticles->pluck('id'))
                ->latest('published_at')
                ->limit(3 - $relatedArticles->count())
                ->get();

            $relatedArticles = $relatedArticles->concat($extraArticles);
        }

        return Inertia::render('Blog/Show', [
            'article' => $this->payload($post),
            'relatedArticles' => $relatedArticles
                ->map(fn (BlogPost $relatedPost) => $this->payload($relatedPost))
                ->values(),
        ]);
    }

    public function payload(BlogPost $post): array
    {
        $publishedAt = $post->published_at ?: $post->created_at;

        return [
            'id' => $post->id,
            'title' => $post->title,
            'slug' => $post->slug,
            'category' => $post->category,
            'author' => $post->author,
            'date' => $publishedAt?->translatedFormat('d M') ?? '',
            'day' => $publishedAt?->format('d') ?? '',
            'month' => $publishedAt?->translatedFormat('M') ?? '',
            'image' => $this->imageUrl($post->featured_image),
            'excerpt' => $post->excerpt,
            'content' => $this->paragraphs($post->content),
            'views' => $post->views_count,
            'comments_count' => 0,
            'url' => route('blog.show', ['slug' => $post->slug]),
        ];
    }

    private function paragraphs(?string $content): array
    {
        return collect(preg_split("/\r\n\r\n|\n\n|\r\r/", (string) $content) ?: [])
            ->map(fn (string $paragraph) => trim($paragraph))
            ->filter()
            ->values()
            ->all();
    }

    private function imageUrl(?string $path): string
    {
        if (! $path) {
            return Images11::urlAt(18) ?: '/images/logomatjari.png';
        }

        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        if (str_starts_with($path, '/storage/') || str_starts_with($path, '/images/')) {
            return $path;
        }

        if (str_starts_with($path, '/')) {
            return is_file(public_path(ltrim($path, '/'))) ? $path : '/images/logomatjari.png';
        }

        if (is_file(public_path($path))) {
            return '/'.ltrim($path, '/');
        }

        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->url($path);
        }

        return Storage::exists($path) ? Storage::url($path) : '/images/logomatjari.png';
    }
}
