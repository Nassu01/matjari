<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DeliveryProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'city',
        'delivery_zone',
        'vehicle_type',
        'cin',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
