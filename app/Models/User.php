<?php

namespace App\Models;

use Database\Factories\UserFactory;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Product; 
use Laravel\Cashier\Billable;


class User extends Authenticatable implements FilamentUser
{
    /** @use HasFactory<UserFactory> */
    use Billable, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'first_name',
        'last_name',
        'display_name',
        'bio',
        'profile_picture_url',
        'email',
        'phone',
        'role',
        'status',
        'password',
        'phone_verified_at',
        'google_id',
        'google_avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'phone_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function merchantProducts(): HasMany
    {
        return $this->hasMany(Product::class, 'merchant_id');
    }

    public function company(): HasOne
    {
        return $this->hasOne(Company::class);
    }

    public function deliveryProfile(): HasOne
    {
        return $this->hasOne(DeliveryProfile::class);
    }

    public function merchantOrders(): HasMany
    {
        return $this->hasMany(Order::class, 'merchant_id');
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isMerchant(): bool
    {
        return $this->role === 'commercant';
    }

    public function isDelivery(): bool
    {
        return $this->role === 'livreur';
    }

    public function isClient(): bool
    {
        return $this->role === 'client';
    }

    public function isActive(): bool
    {
        return $this->status === 'active';
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return $this->isAdmin();
    }

    public function favoriteProducts(): BelongsToMany
    {
        // إذا كان اسم جدول الوسيط الافتراضي لديك هو 'id_product_user' أو 'favorite_product' 
        // يمكنك تمريره كعامل ثانٍ هنا، وإلا سيفترض Eloquent تلقائياً أنه 'product_user'
        return $this->belongsToMany(Product::class, 'product_user', 'user_id', 'product_id')
                    ->withTimestamps();
    }


}
