<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class EnsureActiveRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        $user = $request->user();

        if (! $user || $user->role !== $role) {
            abort(403);
        }

        if ($user->status === 'active') {
            return $next($request);
        }

        $prefix = match ($role) {
            'commercant' => 'merchant',
            'livreur' => 'delivery',
            default => null,
        };

        if (! $prefix) {
            abort(403);
        }

        return redirect("/{$prefix}/pending");
    }
}
