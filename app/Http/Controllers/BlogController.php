<?php

namespace App\Http\Controllers;

use App\Support\Images11;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Blog/Index', [
            'articles' => $this->articles(),
        ]);
    }

    public function show(string $slug): Response
    {
        $articles = $this->articles();
        $article = collect($articles)->firstWhere('slug', $slug);

        abort_unless($article, 404);

        return Inertia::render('Blog/Show', [
            'article' => $article,
            'relatedArticles' => collect($articles)
                ->reject(fn (array $item) => $item['slug'] === $slug)
                ->take(3)
                ->values()
                ->all(),
        ]);
    }

    private function articles(): array
    {
        return [
            [
                'title' => 'Comment mieux choisir vos essentiels du quotidien',
                'slug' => 'comment-mieux-choisir-vos-essentiels-du-quotidien',
                'category' => "Guide d'achat",
                'author' => 'MATJARI',
                'date' => '09 Sep',
                'day' => '09',
                'month' => 'Sep',
                'image' => Images11::urlAt(18) ?: '/images/logomatjari.png',
                'excerpt' => "Un guide simple pour sélectionner des articles utiles, élégants et adaptés à votre style de vie.",
                'content' => [
                    "Choisir les bons produits pour son quotidien commence par identifier ses besoins réels. Sur MATJARI, l’objectif est de proposer des articles utiles, élégants et faciles à intégrer dans votre routine.",
                    "Comparez les matières, les fonctionnalités, les avis et le rapport qualité-prix avant d’ajouter un produit à votre panier. Un achat réussi est souvent celui qui répond à un usage précis, dure dans le temps et reste agréable à utiliser.",
                    "Pensez aussi à composer votre panier autour de produits complémentaires. Quelques essentiels bien choisis peuvent améliorer votre confort, votre organisation et votre style sans multiplier les achats inutiles.",
                ],
                'views' => 1840,
                'comments_count' => 12,
            ],
            [
                'title' => 'Les tendances mode et accessoires à suivre',
                'slug' => 'les-tendances-mode-et-accessoires-a-suivre',
                'category' => 'Tendances',
                'author' => 'MATJARI',
                'date' => '02 Août',
                'day' => '02',
                'month' => 'Août',
                'image' => Images11::urlAt(19) ?: '/images/logomatjari.png',
                'excerpt' => 'Explorez les pièces, détails et nouveautés qui apportent une touche moderne à vos achats.',
                'content' => [
                    'Les tendances fortes privilégient les pièces faciles à porter, les accessoires affirmés et les matières agréables au quotidien.',
                    'Un sac structuré, une paire de chaussures confortable ou un bijou discret peuvent transformer une tenue simple en silhouette plus travaillée.',
                    'L’idée n’est pas de suivre toutes les tendances, mais de choisir celles qui correspondent à votre rythme de vie et à votre style personnel.',
                ],
                'views' => 2310,
                'comments_count' => 9,
            ],
            [
                'title' => 'Les essentiels lifestyle à ajouter à votre panier',
                'slug' => 'les-essentiels-lifestyle-a-ajouter-a-votre-panier',
                'category' => 'Lifestyle',
                'author' => 'MATJARI',
                'date' => '30 Sep',
                'day' => '30',
                'month' => 'Sep',
                'image' => Images11::urlAt(20) ?: '/images/logomatjari.png',
                'excerpt' => 'Une sélection pratique pour simplifier vos achats et rendre votre quotidien plus agréable.',
                'content' => [
                    'Les essentiels lifestyle sont ces produits simples qui rendent les journées plus fluides: rangement, accessoires pratiques, objets utiles et articles de confort.',
                    'Avant de valider votre panier, demandez-vous si chaque produit apporte une vraie valeur à votre routine.',
                    'Sur MATJARI, vous pouvez construire une sélection équilibrée entre utilité, esthétique et budget.',
                ],
                'views' => 1568,
                'comments_count' => 7,
            ],
            [
                'title' => 'Idées cadeaux pour toutes les occasions',
                'slug' => 'idees-cadeaux-pour-toutes-les-occasions',
                'category' => 'Conseils',
                'author' => 'MATJARI',
                'date' => '15 Sep',
                'day' => '15',
                'month' => 'Sep',
                'image' => Images11::urlAt(21) ?: '/images/logomatjari.png',
                'excerpt' => "Trouvez l’inspiration pour offrir des produits utiles, raffinés et adaptés à chaque moment important.",
                'content' => [
                    'Un bon cadeau est personnel, utile et soigné. Il peut être simple, tant qu’il montre une vraie attention.',
                    'Pour choisir plus facilement, partez de la personnalité de la personne: pratique, élégante, créative, sportive ou passionnée de technologie.',
                    'Les paniers thématiques sont aussi une excellente option: beauté, maison, accessoires, lifestyle ou high-tech.',
                ],
                'views' => 2896,
                'comments_count' => 15,
            ],
        ];
    }
}
