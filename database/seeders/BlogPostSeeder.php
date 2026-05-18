<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        $posts = [
            [
                'title' => 'Comment mieux choisir vos essentiels du quotidien',
                'category' => "Guide d'achat",
                'excerpt' => 'Un guide simple pour selectionner des articles utiles, elegants et adaptes a votre style de vie.',
                'featured_image' => 'https://images.unsplash.com/photo-1511556820780-d912e42b4980?auto=format&fit=crop&w=1200&q=80',
                'content' => implode("\n\n", [
                    "Choisir les bons produits pour son quotidien commence par identifier ses besoins reels. Sur MATJARI, l'objectif est de proposer des articles utiles, elegants et faciles a integrer dans votre routine.",
                    "Comparez les matieres, les fonctionnalites, les avis et le rapport qualite-prix avant d'ajouter un produit a votre panier. Un achat reussi est souvent celui qui repond a un usage precis, dure dans le temps et reste agreable a utiliser.",
                    "Pensez aussi a composer votre panier autour de produits complementaires. Quelques essentiels bien choisis peuvent ameliorer votre confort, votre organisation et votre style sans multiplier les achats inutiles.",
                ]),
            ],
            [
                'title' => 'Les tendances mode et accessoires a suivre',
                'category' => 'Tendances',
                'excerpt' => 'Explorez les pieces, details et nouveautes qui apportent une touche moderne a vos achats.',
                'featured_image' => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
                'content' => implode("\n\n", [
                    'Les tendances fortes privilegient les pieces faciles a porter, les accessoires affirmes et les matieres agreables au quotidien.',
                    'Un sac structure, une paire de chaussures confortable ou un bijou discret peuvent transformer une tenue simple en silhouette plus travaillee.',
                    "L'idee n'est pas de suivre toutes les tendances, mais de choisir celles qui correspondent a votre rythme de vie et a votre style personnel.",
                ]),
            ],
            [
                'title' => 'High-tech utile: bien choisir vos accessoires connectes',
                'category' => 'High-tech',
                'excerpt' => 'Telephones, ecouteurs, montres et accessoires: les criteres simples pour acheter sans hesiter.',
                'featured_image' => 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
                'content' => implode("\n\n", [
                    'Un bon accessoire high-tech doit simplifier votre usage, pas le compliquer. Regardez la compatibilite, l autonomie, la garantie et les avis clients avant de choisir.',
                    'Pour les ecouteurs, privilegiez le confort et la stabilite. Pour les montres connectees, pensez aux notifications, au suivi sante et a la batterie.',
                    'MATJARI vous aide a comparer les essentiels pour trouver des produits fiables, modernes et adaptes a votre budget.',
                ]),
            ],
            [
                'title' => 'Idees cadeaux pour toutes les occasions',
                'category' => 'Conseils',
                'excerpt' => "Trouvez l'inspiration pour offrir des produits utiles, raffines et adaptes a chaque moment important.",
                'featured_image' => 'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=1200&q=80',
                'content' => implode("\n\n", [
                    'Un bon cadeau est personnel, utile et soigne. Il peut etre simple, tant qu il montre une vraie attention.',
                    'Pour choisir plus facilement, partez de la personnalite de la personne: pratique, elegante, creative, sportive ou passionnee de technologie.',
                    'Les paniers thematiques sont aussi une excellente option: maison, accessoires, lifestyle ou high-tech.',
                ]),
            ],
        ];

        foreach ($posts as $index => $post) {
            BlogPost::updateOrCreate(
                ['slug' => Str::slug($post['title'])],
                [
                    ...$post,
                    'slug' => Str::slug($post['title']),
                    'author' => 'MATJARI',
                    'published_at' => now()->subDays(20 - ($index * 4)),
                    'status' => 'published',
                    'is_featured' => $index < 3,
                    'views_count' => [1840, 2310, 1765, 2896][$index],
                ],
            );
        }
    }
}
